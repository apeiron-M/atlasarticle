/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { AtlasArticleArticleOperations } from "../../gen/article/operations";
import { Status, GlobalTag } from "../../gen/schema";

export const reducer: AtlasArticleArticleOperations = {
  updateArticleOperation(state, action, dispatch) {
    // Find the article to update based on the input id
    const article = state;
    
    if (!article) {
      throw new Error(`Article with id ${action.input.id} not found`);
    }

    // Update fields if provided in the input
    if (action.input.name !== undefined) {
      article.name = action.input.name;
    }

    if (action.input.docNo !== undefined) {
      article.docNo = action.input.docNo;
    }

    if (action.input.content !== undefined) {
      article.content = action.input.content;
    }

    if (action.input.masterStatus) {
      article.masterStatus = action.input.masterStatus[0] as Status;
    }

    if (action.input.globalTags) {
      // Convert string array to GlobalTag array
      article.globalTags = action.input.globalTags.map(tag => tag as GlobalTag);
    }

    if (action.input.originalContextData) {
      article.originalContextData = action.input.originalContextData;
    }

    if (action.input.provenance !== undefined) {
      article.provenance = action.input.provenance;
    }
  },
};
