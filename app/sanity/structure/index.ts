import { Home } from 'lucide-react';
import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from 'sanity/structure';

import OGPreview from '~/sanity/components/OGPreview';
import { resolveOGUrl } from '~/sanity/structure/resolveOGUrl';

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      // Singleton, home page curation
      S.listItem()
        .icon(Home)
        .id('home')
        .schemaType('home')
        .title('Home')
        .child(S.editor().id('home').schemaType('home').documentId('home')),
    ]);

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType, documentId }
) => {
  const OGPreviewView = S.view
    .component(OGPreview)
    .options({
      url: resolveOGUrl(documentId),
    })
    .title('OG Preview');

  switch (schemaType) {
    case `blockContent`:
      return S.document().views([S.view.form()]);
    // case `post`:
    //   return S.document().views([S.view.form(), OGPreviewView]);
    default:
      return S.document().views([S.view.form()]);
  }
};
