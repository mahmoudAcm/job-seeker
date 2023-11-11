'use client';

import { MultiFileDropzone, type FileState } from '@/src/components/ui/multi-file-dropzone';
import { useEdgeStore } from '@/src/lib/edgestore';
import { useState } from 'react';
import { cn } from '@/src/utils/cn';

interface UploadCvProps {
  className?: string;
  onUpload: (url: string) => void;
}

export default function UploadCv({ onUpload, className }: UploadCvProps) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates(fileStates => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(fileState => fileState.key === key);
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  return (
    <div className={cn('mx-auto', className)}>
      <MultiFileDropzone
        value={fileStates}
        className='h-[200px]'
        dropzoneOptions={{
          maxFiles: 1
        }}
        onChange={files => {
          setFileStates(files);
        }}
        onFilesAdded={async addedFiles => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async addedFileState => {
              try {
                const res = await edgestore.myProtectedFiles.upload({
                  file: addedFileState.file,
                  options: {
                    temporary: true
                  },
                  onProgressChange: async progress => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise(resolve => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  }
                });
                onUpload(res.url);
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            })
          );
        }}
      />
    </div>
  );
}
