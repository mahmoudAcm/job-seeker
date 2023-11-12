import { initEdgeStore } from '@edgestore/server';
import { CreateContextOptions, createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

type Context = {
  userId: string;
  userRole: 'admin' | 'user';
};

function createContext({ req }: CreateContextOptions): Context {
  return {
    userId: '1234',
    userRole: 'user'
  };
}

const es = initEdgeStore.context<Context>().create();

const edgeStoreRouter = es.router({
  myProtectedFiles: es
    .fileBucket({
      accept: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
    })
    // e.g. /123/my-file.pdf
    .path(({ ctx }) => [{ owner: ctx.userId ?? '1234' }])
    .accessControl({
      OR: [
        {
          userId: { path: 'owner' }
        },
        {
          userRole: { eq: 'admin' }
        }
      ]
    })
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
