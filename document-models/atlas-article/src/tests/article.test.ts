/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import { utils as documentModelUtils } from "document-model/document";

import utils from "../../gen/utils";
import { z, UpdateArticleInput } from "../../gen/schema";
import { reducer } from "../../gen/reducer";
import * as creators from "../../gen/article/creators";
import { AtlasArticleDocument } from "../../gen/types";

describe("Article Operations", () => {
  let document: AtlasArticleDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle basic updateArticle operation", () => {
    const input: UpdateArticleInput = {
      id: documentModelUtils.hashKey(),
      name: "Test Article",
      docNo: "DOC-001",
      content: "This is test content",
      masterStatus: ["PROVISIONAL"],
      originalContextData: []
    };

    const updatedDocument = reducer(document, creators.updateArticle(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("UPDATE_ARTICLE");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
    expect(updatedDocument.state.global.name).toBe(input.name);
    expect(updatedDocument.state.global.docNo).toBe(input.docNo);
    expect(updatedDocument.state.global.content).toBe(input.content);
  });

  it("should handle updateArticle operation with status change", () => {
    const input: UpdateArticleInput = {
      id: documentModelUtils.hashKey(),
      masterStatus: ["APPROVED"],
      originalContextData: []
    };

    const updatedDocument = reducer(document, creators.updateArticle(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.state.global.masterStatus).toBe("APPROVED");
  });

  it("should handle updateArticle operation with global tags", () => {
    const input: UpdateArticleInput = {
      id: documentModelUtils.hashKey(),
      globalTags: ["CAIS_", "DAO_TOOLKIT_"],
      masterStatus: ["PROVISIONAL"],
      originalContextData: []
    };

    const updatedDocument = reducer(document, creators.updateArticle(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.state.global.globalTags).toEqual(expect.arrayContaining(input.globalTags));
  });

  it("should handle updateArticle operation with originalContextData", () => {
    const contextDataIds = [
      documentModelUtils.hashKey(),
      documentModelUtils.hashKey()
    ];
    
    const input: UpdateArticleInput = {
      id: documentModelUtils.hashKey(),
      originalContextData: contextDataIds,
      masterStatus: ["PROVISIONAL"]
    };

    const updatedDocument = reducer(document, creators.updateArticle(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.state.global.originalContextData).toEqual(contextDataIds);
  });

  it("should handle updateArticle operation with provenance", () => {
    const input: UpdateArticleInput = {
      id: documentModelUtils.hashKey(),
      provenance: "https://example.com/source",
      masterStatus: ["PROVISIONAL"],
      originalContextData: []
    };

    const updatedDocument = reducer(document, creators.updateArticle(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.state.global.provenance).toBe(input.provenance);
  });

  it("should handle multiple field updates in single operation", () => {
    const input: UpdateArticleInput = {
      id: documentModelUtils.hashKey(),
      docNo: "DOC-002",
      content: "Updated content",
      masterStatus: ["PROVISIONAL"],
      globalTags: ["CAIS_", "ECOSYSTEM_INTELLIGENCE_"],
      originalContextData: []
    };

    const updatedDocument = reducer(document, creators.updateArticle(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.state.global.docNo).toBe(input.docNo);
    expect(updatedDocument.state.global.content).toBe(input.content);
    expect(updatedDocument.state.global.masterStatus).toBe("PROVISIONAL");
    expect(updatedDocument.state.global.globalTags).toEqual(expect.arrayContaining(input.globalTags));
  });
});
