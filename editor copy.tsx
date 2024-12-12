import { EditorProps } from "document-model/document";
import {
  AtlasArticleState,
  AtlasArticleAction,
  AtlasArticleLocalState,
  actions,
} from "../../document-models/atlas-article";
import { useState } from "react";
import { Button } from "@powerhousedao/design-system";
import { Status, GlobalTag } from "../../document-models/atlas-article/gen/schema";

export type IProps = EditorProps<
  AtlasArticleState,
  AtlasArticleAction,
  AtlasArticleLocalState
>;

const SCOPE_OPTIONS = [
  { id: "governance", name: "Governance" },
  { id: "support", name: "Support" },
  { id: "stability", name: "Stability" },
  { id: "protocol", name: "Protocol" },
  { id: "accessibility", name: "Accessibility" }
] as const;

const SECTION_LINKS = [
  { id: "S.1.1", title: "Powers And Constraints | SECTION" },
  { id: "S.1.2", title: "Implementation Details | SECTION" },
  { id: "S.1.3", title: "Core Requirements | SECTION" },
];

// Helper function to generate sections for an article
const generateSections = (articleId: string, articleTitle: string, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${articleId}.${i + 1}`,
    title: `${articleTitle} ${i + 1}`,
    type: "SECTION"
  }));
};

// Update ARTICLE_SECTIONS with sections for all articles
const ARTICLE_SECTIONS: Record<string, Array<{id: string, title: string, type: string}>> = {
  // Governance scope articles
  "A.1.1": generateSections("A.1.1", "Spirit of the Atlas", 5),
  "A.1.2": generateSections("A.1.2", "Atlas Documents", 4),
  "A.1.3": generateSections("A.1.3", "Governance Accessibility", 3),
  "A.1.4": generateSections("A.1.4", "Alignment Conservers", 6),
  "A.1.5": generateSections("A.1.5", "Aligned Delegates", 4),
  "A.1.6": generateSections("A.1.6", "Facilitators", 3),
  "A.1.7": generateSections("A.1.7", "Professional Ecosystem Actors", 5),
  "A.1.8": generateSections("A.1.8", "Emergency Response System", 7),
  "A.1.9": generateSections("A.1.9", "Sky Core Governance Security", 6),
  "A.1.10": generateSections("A.1.10", "Weekly Governance Cycle", 4),
  "A.1.11": generateSections("A.1.11", "Monthly Governance Cycle", 5),
  "A.1.12": generateSections("A.1.12", "Updating Active Data", 3),
  "A.1.13": generateSections("A.1.13", "Scope Bootstrapping", 4),

  // Support scope articles
  "A.2.1": generateSections("A.2.1", "Governance Process Support", 5),
  "A.2.2": generateSections("A.2.2", "Atlas Core Development", 6),
  "A.2.3": generateSections("A.2.3", "Star Incubation", 4),
  "A.2.4": generateSections("A.2.4", "Ecosystem Actor Incubation", 5),
  "A.2.5": generateSections("A.2.5", "Ecosystem Communication Channels", 3),
  "A.2.6": generateSections("A.2.6", "Ecosystem Agreements", 4),
  "A.2.7": generateSections("A.2.7", "Legal Resilience", 6),
  "A.2.8": generateSections("A.2.8", "Resilience Research and Preparedness", 5),
  "A.2.9": generateSections("A.2.9", "Ecosystem Security Infrastructure", 7),
  "A.2.10": generateSections("A.2.10", "Purpose System", 4),

  // Stability scope articles
  "A.3.1": generateSections("A.3.1", "Scope Improvement", 3),
  "A.3.2": generateSections("A.3.2", "Core Stability Parameters", 5),
  "A.3.3": generateSections("A.3.3", "Real World Assets", 6),
  "A.3.4": generateSections("A.3.4", "Collateral Portfolio", 4),
  "A.3.5": generateSections("A.3.5", "Surplus Buffer and Smart Burn Engine", 7),
  "A.3.6": generateSections("A.3.6", "SKY Backstop", 3),
  "A.3.7": generateSections("A.3.7", "Sealing USDS Generation Risk Parameters", 5),
  "A.3.8": generateSections("A.3.8", "Measures For Endgame Transition", 4),

  // Protocol scope articles
  "A.4.1": generateSections("A.4.1", "Core Tokens", 5),
  "A.4.2": generateSections("A.4.2", "SkyLink", 4),
  "A.4.3": generateSections("A.4.3", "Savings Rate And Token Reward Mechanism", 6),
  "A.4.4": generateSections("A.4.4", "Activation And Sealing Mechanisms", 5),
  "A.4.5": generateSections("A.4.5", "Emissions", 3),

  // Accessibility scope articles
  "A.5.1": generateSections("A.5.1", "Brand Identity", 4),
  "A.5.2": generateSections("A.5.2", "Integrator Program", 5),
  "A.5.3": generateSections("A.5.3", "Accessibility Communication Channels", 3),
  "A.5.4": generateSections("A.5.4", "Accessibility Campaigns", 4),
  "A.5.5": generateSections("A.5.5", "Location Resilience", 6),
  "A.5.6": generateSections("A.5.6", "Launch Project", 5)
};

const SCOPE_ARTICLES = {
  governance: [
    { id: "A.1.1", title: "Spirit of the Atlas", type: "ARTICLE" },
    { id: "A.1.2", title: "Atlas Documents", type: "ARTICLE" },
    { id: "A.1.3", title: "Governance Accessibility", type: "ARTICLE" },
    { id: "A.1.4", title: "Alignment Conservers", type: "ARTICLE" },
    { id: "A.1.5", title: "Aligned Delegates", type: "ARTICLE" },
    { id: "A.1.6", title: "Facilitators", type: "ARTICLE" },
    { id: "A.1.7", title: "Professional Ecosystem Actors", type: "ARTICLE" },
    { id: "A.1.8", title: "Emergency Response System", type: "ARTICLE" },
    { id: "A.1.9", title: "Sky Core Governance Security", type: "ARTICLE" },
    { id: "A.1.10", title: "Weekly Governance Cycle", type: "ARTICLE" },
    { id: "A.1.11", title: "Monthly Governance Cycle", type: "ARTICLE" },
    { id: "A.1.12", title: "Updating Active Data", type: "ARTICLE" },
    { id: "A.1.13", title: "Scope Bootstrapping", type: "ARTICLE" }
  ],
  support: [
    { id: "A.2.1", title: "Governance Process Support", type: "ARTICLE" },
    { id: "A.2.2", title: "Atlas Core Development", type: "ARTICLE" },
    { id: "A.2.3", title: "Star Incubation", type: "ARTICLE" },
    { id: "A.2.4", title: "Ecosystem Actor Incubation", type: "ARTICLE" },
    { id: "A.2.5", title: "Ecosystem Communication Channels", type: "ARTICLE" },
    { id: "A.2.6", title: "Ecosystem Agreements", type: "ARTICLE" },
    { id: "A.2.7", title: "Legal Resilience", type: "ARTICLE" },
    { id: "A.2.8", title: "Resilience Research and Preparedness", type: "ARTICLE" },
    { id: "A.2.9", title: "Ecosystem Security Infrastructure", type: "ARTICLE" },
    { id: "A.2.10", title: "Purpose System", type: "ARTICLE" }
  ],
  stability: [
    { id: "A.3.1", title: "Scope Improvement", type: "ARTICLE" },
    { id: "A.3.2", title: "Core Stability Parameters", type: "ARTICLE" },
    { id: "A.3.3", title: "Real World Assets", type: "ARTICLE" },
    { id: "A.3.4", title: "Collateral Portfolio", type: "ARTICLE" },
    { id: "A.3.5", title: "Surplus Buffer and Smart Burn Engine", type: "ARTICLE" },
    { id: "A.3.6", title: "SKY Backstop", type: "ARTICLE" },
    { id: "A.3.7", title: "Sealing USDS Generation Risk Parameters", type: "ARTICLE" },
    { id: "A.3.8", title: "Measures For Endgame Transition", type: "ARTICLE" }
  ],
  protocol: [
    { id: "A.4.1", title: "Core Tokens", type: "ARTICLE" },
    { id: "A.4.2", title: "SkyLink", type: "ARTICLE" },
    { id: "A.4.3", title: "Savings Rate And Token Reward Mechanism", type: "ARTICLE" },
    { id: "A.4.4", title: "Activation And Sealing Mechanisms", type: "ARTICLE" },
    { id: "A.4.5", title: "Emissions", type: "ARTICLE" }
  ],
  accessibility: [
    { id: "A.5.1", title: "Brand Identity", type: "ARTICLE" },
    { id: "A.5.2", title: "Integrator Program", type: "ARTICLE" },
    { id: "A.5.3", title: "Accessibility Communication Channels", type: "ARTICLE" },
    { id: "A.5.4", title: "Accessibility Campaigns", type: "ARTICLE" },
    { id: "A.5.5", title: "Location Resilience", type: "ARTICLE" },
    { id: "A.5.6", title: "Launch Project", type: "ARTICLE" }
  ]
} as const;

// Add status color helper
const getStatusColor = (status: string | undefined) => {
  switch (status) {
    case "APPROVED":
      return "#4caf50";  // green
    case "PROVISIONAL":
      return "#2196f3";  // blue
    case "DEFERRED":
      return "#ff9800";  // orange
    case "ARCHIVED":
      return "#f44336";  // red
    default:
      return "#757575";  // gray for PLACEHOLDER
  }
};

// Add interface for tracking changes per article
interface ArticleChanges {
  [articleId: string]: {
    status?: Status;
    tags?: GlobalTag[];
    hasChanges: boolean;
  }
}

export default function Editor(props: IProps) {
  const { document, dispatch } = props;
  const {
    state: { global: state },
  } = document;

  const [editingName, setEditingName] = useState(state.name || "");
  const [content, setContent] = useState(state.content || "");
  const [newProvenance, setNewProvenance] = useState("");
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [selectedScope, setSelectedScope] = useState(state.parent || SCOPE_OPTIONS[0].id);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  // Add state for editing
  const [editingContent, setEditingContent] = useState(state.content || "");

  // Add pending states for status and tags
  const [pendingStatus, setPendingStatus] = useState<Status>(
    Array.isArray(state.masterStatus) ? state.masterStatus[0] : "PLACEHOLDER"
  );
  const [pendingTags, setPendingTags] = useState<GlobalTag[]>(
    state.globalTags || []
  );

  // Add state for tracking changes per article
  const [articleChanges, setArticleChanges] = useState<ArticleChanges>({});

  // Update article selection handler to load article-specific data
  const handleArticleSelect = (articleId: string) => {
    // Check if current article has unsaved changes
    if (selectedArticle && articleChanges[selectedArticle]?.hasChanges) {
      const confirmSwitch = window.confirm(
        "You have unsaved changes. Would you like to apply these changes before switching articles?"
      );
      
      if (confirmSwitch) {
        handleSubmit(); // Use the same submit handler to save changes
      }
    }
    
    // Switch to new article
    setSelectedArticle(articleId);
    
    // Load the article's current state or defaults
    if (articleChanges[articleId]) {
      // Load saved changes if they exist
      setPendingStatus(articleChanges[articleId].status || "PLACEHOLDER");
      setPendingTags(articleChanges[articleId].tags || []); // Load article-specific tags
    } else {
      // Load defaults - empty tags for new articles
      setPendingStatus(Array.isArray(state.masterStatus) ? state.masterStatus[0] : "PLACEHOLDER");
      setPendingTags([]); // Start with empty tags for new articles
    }
  };

  // Update submit handler to only save current article's changes
  const handleSubmit = () => {
    if (!selectedArticle) return;
    
    // Save changes to the current article
    dispatch(
      actions.updateArticle({
        ...state,
        id: selectedArticle,
        masterStatus: [pendingStatus],
        globalTags: pendingTags,
        name: state.name || "",
        content: state.content || "",
        docNo: state.docNo || "",
        originalContextData: state.originalContextData || []
      })
    );
    
    // Update the article's changes in our tracking state
    setArticleChanges(prev => ({
      ...prev,
      [selectedArticle]: {
        status: pendingStatus,
        tags: pendingTags,
        hasChanges: false // Reset changes flag after saving
      }
    }));
    
    setShowCheckmark(true);
    setTimeout(() => setShowCheckmark(false), 2000);
  };

  // Update status change handler
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedArticle) return;
    
    const newStatus = e.target.value as Status;
    setPendingStatus(newStatus);
    
    // Mark changes but don't save yet
    setArticleChanges(prev => ({
      ...prev,
      [selectedArticle]: {
        ...prev[selectedArticle],
        status: newStatus,
        hasChanges: true
      }
    }));
  };

  // Update tag handlers to be article-specific
  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedArticle) return;
    
    const newTag = e.target.value as GlobalTag;
    if (newTag && !pendingTags.includes(newTag)) {
      const newTags = [...pendingTags, newTag];
      setPendingTags(newTags);
      
      // Mark changes but don't save yet
      setArticleChanges(prev => ({
        ...prev,
        [selectedArticle]: {
          ...prev[selectedArticle],
          tags: newTags, // Store tags specific to this article
          hasChanges: true
        }
      }));
    }
  };

  const removeTag = (tagToRemove: GlobalTag) => {
    if (!selectedArticle) return;
    
    const newTags = pendingTags.filter(tag => tag !== tagToRemove);
    setPendingTags(newTags);
    
    // Update article-specific tags
    setArticleChanges(prev => ({
      ...prev,
      [selectedArticle]: {
        ...prev[selectedArticle],
        tags: newTags,
        hasChanges: true
      }
    }));
  };

  // Add handlers for updates
  const handleNameChange = (newName: string) => {
    setEditingName(newName);
    dispatch(
      actions.updateArticle({
        ...state,
        masterStatus: [state.masterStatus || "PLACEHOLDER"],
        globalTags: state.globalTags || [],
        originalContextData: state.originalContextData || [],
        name: newName
      })
    );
  };

  const handleContentChange = (newContent: string) => {
    setEditingContent(newContent);
    dispatch(
      actions.updateArticle({
        ...state,
        id: document.id,
        content: newContent
      })
    );
  };

  const handleAddTag = (tag: string) => {
    if (!tag) return;
    const currentTags = state.globalTags || [];
    dispatch(
      actions.updateArticle({
        ...state,
        globalTags: [...currentTags, tag as GlobalTag]
      })
    );
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = state.globalTags || [];
    dispatch(
      actions.updateArticle({
        ...state,
        globalTags: currentTags.filter(tag => tag !== tagToRemove)
      })
    );
  };

  const handleScopeSelect = (scopeId: string) => {
    setSelectedScope(scopeId);
    dispatch(
      actions.updateArticle({
        ...state,
        id: document.id,
        parent: scopeId,
        masterStatus: [state.masterStatus || "PLACEHOLDER"],
        globalTags: state.globalTags || [],
        originalContextData: state.originalContextData || []
      })
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Main content */}
      <div style={{ flex: 1 }}>
        {/* Parent Scope Tabs */}
        <div style={{ 
          borderBottom: "1px solid #ccc",
          backgroundColor: "#f8f8f8",
          padding: "0 20px"
        }}>
          <div style={{ 
            display: "flex",
            gap: "2px",
          }}>
            {SCOPE_OPTIONS.map(scope => (
              <button
                key={scope.id}
                onClick={() => handleScopeSelect(scope.id)}
                style={{
                  padding: "12px 24px",
                  border: "none",
                  borderBottom: selectedScope === scope.id 
                    ? "2px solid #2196f3" 
                    : "2px solid transparent",
                  background: selectedScope === scope.id ? "#fff" : "transparent",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: selectedScope === scope.id ? "#2196f3" : "#666",
                  fontWeight: selectedScope === scope.id ? "500" : "normal",
                  transition: "all 0.2s ease",
                  position: "relative",
                  top: "1px",
                  '&:hover': {
                    color: selectedScope === scope.id ? "#2196f3" : "#333",
                    background: selectedScope === scope.id ? "#fff" : "#f0f0f0"
                  }
                }}
              >
                {scope.name} Scope
              </button>
            ))}
          </div>
        </div>

        {/* Articles List and Content Area */}
        {selectedScope && (
          <div style={{ display: "flex" }}>
            {/* Articles List */}
            <div style={{ 
              width: "300px",
              borderRight: "1px solid #ccc",
              backgroundColor: "#f8f8f8",
              padding: "20px"
            }}>
              {SCOPE_ARTICLES[selectedScope as keyof typeof SCOPE_ARTICLES].map(article => (
                <div
                  key={article.id}
                  onClick={() => handleArticleSelect(article.id)}
                  style={{
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#666",
                    backgroundColor: selectedArticle === article.id ? "#e6e6e6" : "transparent",
                    borderRadius: "4px",
                    marginBottom: "4px"
                  }}
                >
                  <span>{article.title}</span>
                  <span style={{ 
                    marginLeft: "auto", 
                    fontSize: "12px",
                    color: "#888",
                    backgroundColor: "#e0e0e0",
                    padding: "2px 6px",
                    borderRadius: "4px"
                  }}>
                    {article.type}
                  </span>
                </div>
              ))}
            </div>

            {/* Article Content and Sections Area */}
            {selectedArticle && (
              <div style={{ flex: 1, display: "flex" }}>
                {/* Article Content */}
                <div style={{ flex: 1, padding: "20px" }}>
                  <h1 style={{ 
                    fontSize: "18px", 
                    marginBottom: "20px",
                    fontWeight: "normal" 
                  }}>
                    {SCOPE_ARTICLES[selectedScope as keyof typeof SCOPE_ARTICLES]
                      .find(a => a.id === selectedArticle)?.title || "Article"}
                  </h1>

                  {/* Description box */}
                  <div style={{ 
                    padding: "12px",
                    border: "1px solid #ccc",
                    marginBottom: "24px",
                    backgroundColor: "#f5f5f5"
                  }}>
                    {content || "Enter article description..."}
                  </div>

                  {/* Form fields */}
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "14px", marginBottom: "4px" }}>Provenance</div>
                    <input
                      type="text"
                      value={newProvenance}
                      onChange={(e) => setNewProvenance(e.target.value)}
                      placeholder="Add a provenance URL..."
                      style={{ 
                        width: "100%",
                        padding: "4px 8px",
                        border: "1px solid #ccc",
                        fontSize: "14px"
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "14px", marginBottom: "4px" }}>Name</div>
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="Article name"
                      style={{ 
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #ccc",
                        fontSize: "14px",
                        borderRadius: "4px",
                        '&:focus': {
                          outline: "none",
                          borderColor: "#2196f3"
                        }
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "14px", marginBottom: "4px" }}>Description</div>
                    <textarea
                      value={editingContent}
                      onChange={(e) => handleContentChange(e.target.value)}
                      placeholder="Enter article description..."
                      style={{ 
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #ccc",
                        fontSize: "14px",
                        minHeight: "100px",
                        resize: "vertical"
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "14px", marginBottom: "4px" }}>Status</div>
                    <select
                      value={pendingStatus}
                      onChange={handleStatusChange}
                      style={{ 
                        width: "200px",
                        padding: "8px 12px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "14px",
                        backgroundColor: "#fff",
                        cursor: "pointer"
                      }}
                    >
                      <option value="PLACEHOLDER">PLACEHOLDER</option>
                      <option value="PROVISIONAL">PROVISIONAL</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="DEFERRED">DEFERRED</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "14px", marginBottom: "4px" }}>Global Tags</div>
                    <div style={{ 
                      display: "flex", 
                      flexWrap: "wrap", 
                      gap: "8px", 
                      marginBottom: "8px" 
                    }}>
                      {pendingTags.map(tag => (
                        <div 
                          key={tag}
                          style={{ 
                            padding: "2px 8px",
                            border: "1px solid #000",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "14px",
                            backgroundColor: "#fff",
                            borderRadius: "2px"
                          }}
                        >
                          {tag.replace(/_/g, ' ').replace(/-/g, ' ')}
                          <button 
                            onClick={() => removeTag(tag)}
                            style={{ 
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: "0 2px",
                              fontSize: "14px",
                              marginLeft: "4px"
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <select
                      value=""
                      onChange={handleTagChange}
                      style={{ 
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #ccc",
                        fontSize: "14px",
                        backgroundColor: "#fff"
                      }}
                    >
                      <option value="">Add a new tag</option>
                      {TAG_OPTIONS
                        .filter(tag => !pendingTags.includes(tag as GlobalTag))
                        .map(tag => (
                          <option key={tag} value={tag}>
                            {tag.replace(/_/g, ' ').replace(/-/g, ' ')}
                          </option>
                        ))}
                    </select>
                  </div>

                  <Button 
                    onClick={handleSubmit}
                    style={{ 
                      padding: "4px 12px",
                      fontSize: "14px",
                      marginTop: "24px"
                    }}
                  >
                    Apply Changes
                  </Button>
                  {showCheckmark && (
                    <span style={{ 
                      color: "#4caf50", 
                      marginLeft: "8px",
                      fontSize: "20px"
                    }}>
                      ✓
                    </span>
                  )}
                </div>

                {/* Sections List */}
                <div style={{ 
                  width: "300px",
                  borderLeft: "1px solid #ccc",
                  backgroundColor: "#f8f8f8",
                  padding: "20px"
                }}>
                  <div style={{ 
                    fontSize: "16px", 
                    fontWeight: "500",
                    marginBottom: "16px",
                    color: "#666"
                  }}>
                    Sections
                  </div>
                  {ARTICLE_SECTIONS[selectedArticle]?.map(section => (
                    <div
                      key={section.id}
                      style={{
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "13px",
                        color: "#666",
                        marginBottom: "4px"
                      }}
                    >
                      <span>{section.title}</span>
                      <span style={{ 
                        marginLeft: "auto", 
                        fontSize: "11px",
                        color: "#888",
                        backgroundColor: "#e0e0e0",
                        padding: "2px 6px",
                        borderRadius: "4px"
                      }}>
                        {section.type}
                      </span>
                    </div>
                  )) || (
                    <div style={{ color: "#666", fontSize: "13px" }}>
                      No sections available for this article
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const TAG_OPTIONS = [
  "SCOPE_ADVISOR_",
  "AVC_",
  "CAIS_",
  "ML___LOW_PRIORITY_",
  "EXTERNAL_REFERENCE_",
  "DAO_TOOLKIT_",
  "ML___DEFER_",
  "PURPOSE_SYSTEM_",
  "NEWCHAIN_",
  "ML___SUPPORT_DOCS_NEEDED_",
  "TWO_STAGE_BRIDGE_",
  "ECOSYSTEM_INTELLIGENCE_",
  "RECURSIVE_IMPROVEMENT_",
  "LEGACY_TERM___USE_APPROVED_"
] as const;
