import React, { useState, useEffect, useRef } from "react";
// Using a variety of icons to enhance the UI
import { 
    FaLayerGroup, 
    FaThLarge, 
    FaMousePointer, 
    FaMinus, 
    FaParagraph, 
    FaHeading, 
    FaImage, 
    FaCode, 
    FaTrash,
    FaTimes,
    FaSave,
    FaArrowsAltV,
    FaClipboard,
    FaAlignLeft,
    FaAlignCenter,
    FaAlignRight,
    FaUpload,
    FaEye,
    FaEyeSlash,
    FaClone,
    FaBold,
    FaItalic,
    FaUnderline
} from "react-icons/fa";

// --- Quill Editor Component ---
// A wrapper for the Quill.js rich text editor.
const QuillEditor = ({ value, onChange }) => {
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    // Effect to initialize Quill, handle script loading, and clean up the instance
    useEffect(() => {
        const initialize = () => {
            // Only initialize if the editor div exists, there's no active Quill instance, and the Quill library is loaded
            if (editorRef.current && !quillRef.current && window.Quill) {
                // Create a new Quill instance
                quillRef.current = new window.Quill(editorRef.current, {
                    theme: 'snow',
                    modules: {
                        toolbar: [
                            [{ 'header': [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            ['link'],
                            ['clean']
                        ],
                    },
                });

                // Set initial value from props
                if (value) {
                    quillRef.current.root.innerHTML = value;
                }

                // Setup listener for text changes
                quillRef.current.on('text-change', (delta, oldDelta, source) => {
                    if (source === 'user' && quillRef.current) {
                        onChange(quillRef.current.root.innerHTML);
                    }
                });
            }
        };

        // Load the Quill script if it's not already on the page
        if (!document.querySelector('#quill-script')) {
            const quillScript = document.createElement('script');
            quillScript.id = 'quill-script';
            quillScript.src = "https://cdn.quilljs.com/1.3.6/quill.js";
            quillScript.async = true;
            document.body.appendChild(quillScript);

            const quillStyle = document.createElement('link');
            quillStyle.id = 'quill-style';
            quillStyle.href = "https://cdn.quilljs.com/1.3.6/quill.snow.css";
            quillStyle.rel = "stylesheet";
            document.head.appendChild(quillStyle);

            quillScript.onload = initialize;
        } else {
            initialize();
        }

        // --- Cleanup function ---
        // This function runs when the component unmounts
        return () => {
            // Nullify the ref to allow for re-initialization if the component remounts.
            quillRef.current = null;
            // Defensively clear the container's HTML. React's unmounting should handle this,
            // but this ensures no residual Quill DOM elements are left behind.
            if (editorRef.current) {
                editorRef.current.innerHTML = '';
            }
        };
    }, []); // Empty dependency array ensures this effect runs only on mount and unmount.
    
    // Effect to sync editor with external state changes (e.g., prop updates)
    useEffect(() => {
        if (quillRef.current && quillRef.current.root.innerHTML !== value) {
            const selection = quillRef.current.getSelection();
            quillRef.current.root.innerHTML = value;
            if (selection) {
                quillRef.current.setSelection(selection.index, selection.length);
            }
        }
    }, [value]);

    return <div ref={editorRef} style={{ height: '200px', backgroundColor: 'white' }}></div>;
};

// --- Settings Panel Component ---
// This component renders the editable properties for the selected component.
const SettingsPanel = ({ component, updateComponentProps, unselectComponent }) => {
    const fileInputRef = useRef(null);

    if (!component) return null;

    // Handles changes in the input fields and updates the component's state.
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateComponentProps(component.id, { [name]: value });
    };
    
    const handleQuillChange = (content) => {
        updateComponentProps(component.id, { text: content });
    };

    const handleAlignmentChange = (alignment) => {
        updateComponentProps(component.id, { alignment });
    };

    const handleImageUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateComponentProps(component.id, { src: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Renders the appropriate settings based on the component's type.
    const renderSettings = () => {
        const supportsAlignment = ['Button', 'Heading', 'Text', 'Image'].includes(component.type);
        
        const commonProps = (
            <>
                {supportsAlignment && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Alignment</label>
                        <div className="flex items-center justify-around border border-gray-300 rounded-md p-1">
                            <button onClick={() => handleAlignmentChange('left')} className={`p-2 rounded-md ${component.props.alignment === 'left' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}><FaAlignLeft /></button>
                            <button onClick={() => handleAlignmentChange('center')} className={`p-2 rounded-md ${component.props.alignment === 'center' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}><FaAlignCenter /></button>
                            <button onClick={() => handleAlignmentChange('right')} className={`p-2 rounded-md ${component.props.alignment === 'right' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}><FaAlignRight /></button>
                        </div>
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Padding (e.g., 10px 20px)</label>
                    <input type="text" name="padding" value={component.props.padding || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Background Color</label>
                    <input type="color" name="backgroundColor" value={component.props.backgroundColor || '#ffffff'} onChange={handleChange} className="w-full p-1 h-10 border border-gray-300 rounded-md"/>
                </div>
            </>
        );

        switch (component.type) {
            case "Button":
                return (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Button Text</label>
                            <input type="text" name="text" value={component.props.text} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"/>
                        </div>
                         <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Text Color</label>
                            <input type="color" name="color" value={component.props.color} onChange={handleChange} className="w-full p-1 h-10 border border-gray-300 rounded-md"/>
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Width (e.g., 100px, 50%)</label>
                                <input type="text" name="width" value={component.props.width || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Height (e.g., 40px)</label>
                                <input type="text" name="height" value={component.props.height || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"/>
                            </div>
                        </div>
                        {commonProps}
                    </>
                );
            case "Text":
                 return (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Content</label>
                            <QuillEditor value={component.props.text} onChange={handleQuillChange} />
                        </div>
                        <div className="mt-12">
                           {commonProps}
                        </div>
                    </>
                );
            case "Heading":
                return (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Heading Text
                                <span className="text-xs text-gray-400 ml-2">(Edit directly on canvas)</span>
                            </label>
                             <div 
                                className="w-full p-2 border border-gray-200 rounded-md bg-gray-50 min-h-[40px]"
                                dangerouslySetInnerHTML={{ __html: component.props.text }}
                             />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Heading Level</label>
                            <select name="tag" value={component.props.tag || 'h1'} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
                                <option value="h1">H1</option>
                                <option value="h2">H2</option>
                                <option value="h3">H3</option>
                                <option value="h4">H4</option>
                                <option value="h5">H5</option>
                                <option value="h6">H6</option>
                            </select>
                        </div>
                        {commonProps}
                    </>
                );
            case "Image":
                return (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
                            <input type="text" name="src" value={component.props.src} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"/>
                        </div>
                        <div className="mb-4">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <button
                                onClick={handleImageUploadClick}
                                className="w-full flex items-center justify-center gap-2 p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                            >
                                <FaUpload /> Upload Image
                            </button>
                        </div>
                         <div className="flex gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Width (e.g., 100px, 100%)</label>
                                <input type="text" name="width" value={component.props.width || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Height (e.g., auto)</label>
                                <input type="text" name="height" value={component.props.height || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"/>
                            </div>
                        </div>
                        {commonProps}
                    </>
                );
            case "Spacer":
                return (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Height (e.g., 20px)</label>
                            <input type="text" name="height" value={component.props.height} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"/>
                        </div>
                    </>
                );
            case "HTML":
                return (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 mb-1">HTML Code</label>
                            <textarea 
                                name="html" 
                                value={component.props.html || ''} 
                                onChange={handleChange} 
                                className="w-full h-48 p-2 border border-gray-300 rounded-md font-mono text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                placeholder="<div>Your HTML here</div>"
                            />
                        </div>
                        {commonProps}
                    </>
                );
            default:
                return unselectComponent()
        }
    };

    return (
        <div className="absolute left-0 h-full w-[23rem] bg-white border-l border-gray-300 shadow-lg z-30">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-800">{component.type} Settings</h2>
                <button onClick={unselectComponent} className="p-1 text-gray-500 hover:text-gray-800">
                    <FaTimes size={20} />
                </button>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100%-65px)]">
                {renderSettings()}
            </div>
        </div>
    );
};

// --- Quick Access Toolbar ---
const QuickAccessToolbar = ({ component, position, updateComponentProps, deleteComponent, duplicateComponent }) => {
    if (!component || !position) return null;

    const handleAlignmentChange = (alignment) => {
        updateComponentProps(component.id, { alignment });
    };
    
    // Function to apply text formatting using document.execCommand
    const handleTextFormat = (command) => {
        document.execCommand(command, false, null);
        // Manually trigger an input event on the focused element to update state
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const element = range.commonAncestorContainer.parentElement;
            if (element && element.isContentEditable) {
                 element.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
    };

    const supportsAlignment = ['Button', 'Heading', 'Text', 'Image'].includes(component.type);
    const supportsTextFormatting = ['Heading', 'Text'].includes(component.type);

    return (
        <div
            className="absolute bg-slate-800 text-white rounded-lg shadow-xl p-1 flex items-center gap-1 z-20"
            style={{ top: position.top, left: position.left, transform: 'translateY(-110%)' }}
            onClick={(e) => e.stopPropagation()}
        >
            <span className="text-xs font-bold px-2">{component.type}</span>
            <div className="w-px h-5 bg-slate-600 mx-1"></div>

            {supportsTextFormatting && (
                 <>
                     <button onMouseDown={(e) => e.preventDefault()} onClick={() => handleTextFormat('bold')} className="p-2 rounded-md hover:bg-slate-700" title="Bold"><FaBold /></button>
                     <button onMouseDown={(e) => e.preventDefault()} onClick={() => handleTextFormat('italic')} className="p-2 rounded-md hover:bg-slate-700" title="Italic"><FaItalic /></button>
                     <button onMouseDown={(e) => e.preventDefault()} onClick={() => handleTextFormat('underline')} className="p-2 rounded-md hover:bg-slate-700" title="Underline"><FaUnderline /></button>
                     <div className="w-px h-5 bg-slate-600 mx-1"></div>
                 </>
            )}
            
            {supportsAlignment && (
                <>
                    <button onMouseDown={(e) => e.preventDefault()} onClick={() => handleAlignmentChange('left')} className={`p-2 rounded-md ${component.props.alignment === 'left' ? 'bg-blue-500' : 'hover:bg-slate-700'}`} title="Align Left"><FaAlignLeft /></button>
                    <button onMouseDown={(e) => e.preventDefault()} onClick={() => handleAlignmentChange('center')} className={`p-2 rounded-md ${component.props.alignment === 'center' ? 'bg-blue-500' : 'hover:bg-slate-700'}`} title="Align Center"><FaAlignCenter /></button>
                    <button onMouseDown={(e) => e.preventDefault()} onClick={() => handleAlignmentChange('right')} className={`p-2 rounded-md ${component.props.alignment === 'right' ? 'bg-blue-500' : 'hover:bg-slate-700'}`} title="Align Right"><FaAlignRight /></button>
                    <div className="w-px h-5 bg-slate-600 mx-1"></div>
                </>
            )}

            <button onClick={() => duplicateComponent(component.id)} className="p-2 rounded-md hover:bg-slate-700" title="Duplicate"><FaClone /></button>
            <button onClick={() => deleteComponent(component.id)} className="p-2 rounded-md hover:bg-red-500" title="Delete"><FaTrash /></button>
        </div>
    );
};

// --- Editable Content Component ---
// A component to handle contentEditable elements without cursor jumping issues in React.
const EditableContent = ({ tagName, html, isPreview, onUpdate, ...props }) => {
    const elementRef = useRef(null);

    // This effect updates the DOM's innerHTML only when the `html` prop
    // differs from the current DOM content. This is the key to preventing
    // the cursor from jumping out of position during user input.
    useEffect(() => {
        if (elementRef.current && html !== elementRef.current.innerHTML) {
            elementRef.current.innerHTML = html;
        }
    }, [html]);

    const handleInput = (event) => {
        if (onUpdate) {
            onUpdate(event.currentTarget.innerHTML);
        }
    };

    const Tag = tagName || 'div';

    // We render the component without children and let the effect manage the innerHTML.
    // This avoids using `dangerouslySetInnerHTML` in the render return, which can cause re-renders to reset the element.
    return (
        <Tag
            {...props}
            ref={elementRef}
            contentEditable={!isPreview}
            suppressContentEditableWarning={true}
            onInput={handleInput}
        />
    );
};


// Main component for the entire application
const App = () => {
    // Component data: Types for the main sidebar
    const types = [
        { name: "Content", icon: <FaLayerGroup size={24} /> },
        { name: "Blocks", icon: <FaThLarge size={24} /> },
    ];

    // Component data: Options available for each type
    const typeOptions = {
        Content: [
            { name: "Button", icon: <FaMousePointer size={24} />, type: "Button" },
            { name: "Divider", icon: <FaMinus size={24} />, type: "Divider" },
            { name: "Heading", icon: <FaHeading size={24} />, type: "Heading" },
            { name: "Text", icon: <FaParagraph size={24} />, type: "Text" },
            { name: "Image", icon: <FaImage size={24} />, type: "Image" },
            { name: "Spacer", icon: <FaArrowsAltV size={24} />, type: "Spacer" },
            { name: "HTML", icon: <FaCode size={24} />, type: "HTML" },
        ],
        Blocks: [
            { blocks: 1, per: ["100%"] },
            { blocks: 2, per: ["50%", "50%"] },
            { blocks: 3, per: ["33.33%", "33.33%", "33.33%"] },
            { blocks: 4, per: ["25%", "25%", "25%", "25%"] },
            { blocks: 2, per: ["33%", "67%"] },
            { blocks: 2, per: ["67%", "33%"] },
        ],
    };

    // State to manage the content on the canvas
    const [canvasContent, setCanvasContent] = useState([]);
    // State for the currently selected sidebar type
    const [selectedType, setSelectedType] = useState("Content");
    // State for the currently selected component on the canvas
    const [selectedComponentId, setSelectedComponentId] = useState(null);
    // State to manage drag-and-drop indicators for reordering
    const [dragIndicator, setDragIndicator] = useState(null);
    // State for the HTML export modal
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportedHtml, setExportedHtml] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
    // State for the new preview mode
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    // State for the quick access toolbar position
    const [toolbarPosition, setToolbarPosition] = useState(null);
    // Refs for component DOM elements
    const componentRefs = useRef({});
    const canvasScrollRef = useRef(null);


    // --- Helper Functions ---

    // Finds a component in the state tree by its ID
    const findComponentById = (items, id) => {
        for (const item of items) {
            if (item.id === id) return item;
            if (item.type === "Block") {
                for (const childArray of item.children) {
                    const found = findComponentById(childArray, id);
                    if (found) return found;
                }
            }
        }
        return null;
    };
    
    // Creates a new component with default properties
    const createNewComponent = (componentType, parsedData) => {
        const newComponent = {
            id: `comp-${Date.now()}-${Math.random()}`,
            type: componentType,
            props: {}, // Default props object
            ...parsedData,
        };

        // Set default properties based on type
        switch(componentType) {
            case 'Button':
                newComponent.props = { text: 'Button', color: '#ffffff', backgroundColor: '#3b82f6', padding: '10px 20px', width: 'auto', height: 'auto', alignment: 'left' };
                break;
            case 'Heading':
                newComponent.props = { text: 'Heading Text', padding: '10px', alignment: 'left', tag: 'h1' };
                break;
            case 'Text':
                newComponent.props = { text: '<p>This is a sample text block. Start editing!</p>', padding: '10px', alignment: 'left' };
                break;
            case 'Image':
                newComponent.props = { src: 'https://placehold.co/300x200/e2e8f0/cbd5e0?text=Placeholder', padding: '0px', width: '100%', height: 'auto', alignment: 'left' };
                break;
            case 'Spacer':
                newComponent.props = { height: '20px' };
                break;
            case 'HTML':
                newComponent.props = { html: '<!-- Your custom HTML goes here -->', padding: '10px', alignment: 'left' };
                break;
            case 'Block':
                newComponent.children = new Array(parsedData.per.length).fill([]);
                break;
            default:
                break;
        }
        return newComponent;
    };

    // --- State Update Functions ---

    // Updates the properties of a specific component
    const updateComponentProps = (id, newProps) => {
        setCanvasContent(prev => {
            const updateRecursively = (items) => {
                return items.map(item => {
                    if (item.id === id) {
                        return { ...item, props: { ...item.props, ...newProps } };
                    }
                    if (item.type === "Block") {
                        return { ...item, children: item.children.map(child => updateRecursively(child)) };
                    }
                    return item;
                });
            };
            return updateRecursively(prev);
        });
    };

    // Deletes a component from the canvas
    const deleteComponent = (componentId) => {
        if (selectedComponentId === componentId) {
            setSelectedComponentId(null);
        }
        const filterRecursive = (items) => {
            return items.filter(item => item.id !== componentId).map(item => {
                if (item.type === "Block") {
                    item.children = item.children.map(childArray => filterRecursive(childArray));
                }
                return item;
            });
        };
        setCanvasContent(prevContent => filterRecursive(prevContent));
    };
    
    // Duplicates a component
    const duplicateComponent = (componentId) => {
        // Helper to recursively find the component and its parent array
        const findComponentAndParent = (items, id) => {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.id === id) {
                    return { component: item, parent: items, index: i };
                }
                if (item.type === "Block") {
                    for (const childArray of item.children) {
                        const found = findComponentAndParent(childArray, id);
                        if (found) return found;
                    }
                }
            }
            return null;
        };

        // Deep clone and create new IDs for the component and any children
        const deepCloneWithNewIds = (item) => {
            const newItem = { ...item, props: { ...item.props }, id: `comp-${Date.now()}-${Math.random()}` };
            if (item.type === "Block" && item.children) {
                newItem.children = item.children.map(childArray => childArray.map(deepCloneWithNewIds));
            }
            return newItem;
        };

        setCanvasContent(prev => {
            const newContent = JSON.parse(JSON.stringify(prev));
            const found = findComponentAndParent(newContent, componentId);

            if (found) {
                const componentToDuplicate = found.component;
                const newComponent = deepCloneWithNewIds(componentToDuplicate);
                found.parent.splice(found.index + 1, 0, newComponent);
            }
            
            return newContent;
        });
    };
    
    // Reorders components within the canvas
    const reorderComponents = (sourceId, targetId, position) => {
        let sourceComponent = null;

        const removeSource = (items) => {
            const filteredItems = [];
            for (const item of items) {
                if (item.id === sourceId) {
                    sourceComponent = item;
                    continue;
                }
                if (item.type === "Block") {
                    item.children = item.children.map(childArray => removeSource(childArray));
                }
                filteredItems.push(item);
            }
            return filteredItems;
        };
        
        const contentWithoutSource = removeSource(JSON.parse(JSON.stringify(canvasContent)));

        const insertAtTarget = (items) => {
            const newItems = [];
            for (const item of items) {
                if (item.id === targetId) {
                    if (position === 'top') {
                        newItems.push(sourceComponent, item);
                    } else {
                        newItems.push(item, sourceComponent);
                    }
                    continue;
                }
                 if (item.type === "Block") {
                    item.children = item.children.map(childArray => insertAtTarget(childArray));
                }
                newItems.push(item);
            }
            return newItems;
        }

        setCanvasContent(insertAtTarget(contentWithoutSource));
    };


    // --- Drag and Drop Handlers ---

    const handleDragStart = (e, componentType, data) => {
        e.dataTransfer.setData("componentType", componentType);
        if (data) e.dataTransfer.setData("componentData", JSON.stringify(data));
    };
    
    const handleCanvasDragStart = (e, componentId) => {
        e.dataTransfer.setData("sourceComponentId", componentId);
        e.stopPropagation();
    };

    // This handler cleans up the drag indicator if a drag operation is cancelled
    const handleDragEnd = () => {
        setDragIndicator(null);
    };

    const handleDrop = (e, targetBlockId = null, targetCellIndex = null) => {
        e.preventDefault();
        e.stopPropagation();
        
        const sourceComponentId = e.dataTransfer.getData("sourceComponentId");
        
        // Handle reordering of existing components
        if (sourceComponentId && dragIndicator) {
             reorderComponents(sourceComponentId, dragIndicator.targetId, dragIndicator.position);
             setDragIndicator(null);
             return;
        }

        const componentType = e.dataTransfer.getData("componentType");
        if (!componentType) {
            setDragIndicator(null);
            return;
        }
        
        const componentData = e.dataTransfer.getData("componentData");
        const parsedData = componentData ? JSON.parse(componentData) : {};
        const newComponent = createNewComponent(componentType, parsedData);

        // Logic to insert a NEW component at a specific position
        const insertNewComponent = (content) => {
            // If there's no drag indicator, just add to the end of the current level
            if (!dragIndicator) {
                return [...content, newComponent];
            }

            const newContent = [];
            let inserted = false;
            for (const item of content) {
                if (item.id === dragIndicator.targetId) {
                    if (dragIndicator.position === 'top') {
                        newContent.push(newComponent, item);
                    } else {
                        newContent.push(item, newComponent);
                    }
                    inserted = true;
                } else {
                    newContent.push(item);
                }
            }
            // If target wasn't found (shouldn't happen), add to end
            if (!inserted) {
                newContent.push(newComponent);
            }
            return newContent;
        };

        // Drop into a specific cell of a "Block" component
        if (targetBlockId !== null && targetCellIndex !== null) {
            setCanvasContent(prev => {
                const newContent = JSON.parse(JSON.stringify(prev));
                const findBlock = (items) => {
                    for(const item of items) {
                        if(item.id === targetBlockId) return item;
                        if(item.type === "Block") {
                            for (const childArray of item.children) {
                                const found = findBlock(childArray);
                                if (found) return found;
                            }
                        }
                    }
                    return null;
                }
                const block = findBlock(newContent);
                if(block) {
                    if (!block.children[targetCellIndex]) {
                        block.children[targetCellIndex] = [];
                    }
                    // Use the insertion logic for dropping within a block cell
                    block.children[targetCellIndex] = insertNewComponent(block.children[targetCellIndex]);
                }
                return newContent;
            });
        // Drop onto the main canvas
        } else {
            setCanvasContent(prev => insertNewComponent(prev));
        }

        setDragIndicator(null);
        if(e.currentTarget.classList.contains("border-blue-500")) {
            e.currentTarget.classList.remove("border-blue-500", "bg-blue-50");
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        if (!e.currentTarget.classList.contains("border-blue-500")) {
            e.currentTarget.classList.add("border-blue-500", "bg-blue-50");
        }
    };
    
    const handleCanvasDragOver = (e, targetId) => {
        e.preventDefault();
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        const position = e.clientY > rect.top + rect.height / 2 ? 'bottom' : 'top';
        setDragIndicator({ targetId, position });
    };

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove("border-blue-500", "bg-blue-50");
    };

    // --- Rendering Functions ---

    const renderCanvasContent = (content, isPreview) => {
        return content.map((item) => {
            componentRefs.current[item.id] = componentRefs.current[item.id] || React.createRef();
            const isSelected = selectedComponentId === item.id;
            const indicatorClass = dragIndicator?.targetId === item.id 
                ? (dragIndicator.position === 'top' ? 'border-t-4 border-blue-500' : 'border-b-4 border-blue-500') 
                : '';
            
            const wrapperStyle = {
                textAlign: item.props.alignment || 'left'
            };

            return (
                <div 
                    key={item.id}
                    ref={componentRefs.current[item.id]}
                    className={`relative group transition-all ${!isPreview ? 'p-1' : ''} ${isSelected && !isPreview ? 'outline outline-2 outline-blue-600' : ''} ${indicatorClass}`}
                    onClick={(e) => { 
                        if (isPreview) return;
                        e.stopPropagation(); 
                        setSelectedComponentId(item.id); 
                    }}
                    draggable={!isPreview}
                    onDragStart={(e) => handleCanvasDragStart(e, item.id)}
                    onDragOver={(e) => handleCanvasDragOver(e, item.id)}
                    onDragEnd={handleDragEnd} 
                    style={wrapperStyle}
                >
                    {renderComponent(item, isPreview)}
                    {isSelected && !isPreview && (
                         <div
                            onClick={(e) => { e.stopPropagation(); deleteComponent(item.id); }}
                            className="absolute top-0 right-0 -mt-3 -mr-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                            aria-label="Delete component"
                        >
                            <FaTrash size={12}/>
                        </div>
                    )}
                </div>
            );
        });
    };

    const renderComponent = (item, isPreview) => {
        const style = { ...item.props };
        delete style.alignment;
        const Tag = item.type === 'Heading' ? (item.props.tag || 'h1') : 'div';

        // Use onInput to update state immediately on any change
        const handleContentUpdate = (newHtml) => {
            updateComponentProps(item.id, { text: newHtml });
        };

        switch (item.type) {
            case "Button":
                return <button style={style} className="font-bold py-2 px-4 rounded shadow-md hover:brightness-90 transition-all inline-block">{style.text}</button>;
            case "Text":
                return <EditableContent 
                    tagName="div"
                    style={style} 
                    className="text-gray-700" 
                    html={item.props.text}
                    isPreview={isPreview}
                    onUpdate={handleContentUpdate}
                />;
            case "Heading":
                delete style.tag;
                return <EditableContent
                    tagName={Tag}
                    style={style} 
                    className="font-bold text-gray-800"
                    html={item.props.text}
                    isPreview={isPreview}
                    onUpdate={handleContentUpdate}
                />;
            case "Divider":
                return <hr className="border-t-2 border-gray-300 my-4" />;
            case "Image":
                return <img src={style.src} alt="user content" style={{padding: style.padding, width: style.width, height: style.height}} className="h-auto rounded inline-block"/>;
            case "Spacer":
                return <div style={{ height: style.height }}></div>;
            case "HTML":
                 return <div style={style} dangerouslySetInnerHTML={{ __html: item.props.html }}></div>;
            case "Block":
                return (
                    <div className="flex w-full gap-2">
                        {item.per.map((width, i) => (
                            <div
                                key={i}
                                style={{ width: width }}
                                className={`min-h-[100px] rounded-lg p-2 flex flex-col gap-2 ${!isPreview ? 'border-2 border-dashed border-gray-300 transition-colors duration-300' : ''}`}
                                onDrop={(e) => handleDrop(e, item.id, i)}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                {item.children[i] && item.children[i].length > 0 
                                    ? renderCanvasContent(item.children[i], isPreview)
                                    : !isPreview && <div className="flex items-center justify-center h-full text-gray-400 pointer-events-none">Drop here</div>
                                }
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };
    
    // --- HTML Generation ---
    const generateHtml = () => {
        const generateStyleString = (props) => {
            let style = '';
            for (const key in props) {
                if (key !== 'text' && key !== 'src' && key !== 'html' && key !== 'alignment' && key !== 'tag') {
                    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                    style += `${cssKey}: ${props[key]}; `;
                }
            }
            return style.trim();
        };

        const buildHtml = (content) => {
            return content.map(item => {
                const style = generateStyleString(item.props);
                const alignmentStyle = `text-align: ${item.props.alignment || 'left'};`;
                
                let elementHtml = '';

                switch (item.type) {
                    case 'Button':
                        elementHtml = `<button style="${style}">${item.props.text}</button>`;
                        break;
                    case 'Text':
                        elementHtml = `<div style="${style}">${item.props.text}</div>`;
                        break;
                    case 'Heading':
                        const Tag = item.props.tag || 'h1';
                        elementHtml = `<${Tag} style="${style}">${item.props.text}</${Tag}>`;
                        break;
                    case 'Image':
                        elementHtml = `<img src="${item.props.src}" style="${style}" alt="image" />`;
                        break;
                    case 'Divider':
                        return '<hr style="border-top: 2px solid #ccc; margin: 1rem 0;" />';
                    case 'Spacer':
                        return `<div style="${style}"></div>`;
                    case 'HTML':
                        elementHtml = `<div style="${style}">${item.props.html}</div>`;
                        break;
                    case 'Block':
                        return `<table style="width: 100%; border-collapse: collapse;"><tr>${item.per.map((width, i) => `<td style="width: ${width}; vertical-align: top;">${buildHtml(item.children[i] || [])}</td>`).join('')}</tr></table>`;
                    default:
                        return '';
                }

                if (['Button', 'Heading', 'Text', 'Image', 'HTML'].includes(item.type)) {
                    return `<div style="${alignmentStyle}">${elementHtml}</div>`;
                }
                return elementHtml;

            }).join('\n');
        };

        const finalHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Exported Template</title>
            </head>
            <body style="margin: 0; padding: 20px; font-family: sans-serif; background-color: #f4f4f4;">
                <div style="max-width: 800px; margin: auto; background-color: #ffffff; padding: 20px;">
                    ${buildHtml(canvasContent)}
                </div>
            </body>
            </html>
        `;
        
        setExportedHtml(finalHtml.trim().replace(/^\s*\n/gm, ""));
        setShowExportModal(true);
    };

    const copyToClipboard = () => {
        const textArea = document.createElement('textarea');
        textArea.value = exportedHtml;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err){
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    };

    const selectedComponent = findComponentById(canvasContent, selectedComponentId);

    // Effect to update toolbar position when selection changes or canvas scrolls
    useEffect(() => {
        const updatePosition = () => {
            if (selectedComponentId && componentRefs.current[selectedComponentId]?.current) {
                const componentRect = componentRefs.current[selectedComponentId].current.getBoundingClientRect();
                const canvasRect = canvasScrollRef.current.getBoundingClientRect();
                setToolbarPosition({
                    top: componentRect.top - canvasRect.top + canvasScrollRef.current.scrollTop,
                    left: componentRect.left - canvasRect.left,
                });
            } else {
                setToolbarPosition(null);
            }
        };

        updatePosition();
        
        const canvasElement = canvasScrollRef.current;
        if (canvasElement) {
            canvasElement.addEventListener('scroll', updatePosition);
            return () => {
                canvasElement.removeEventListener('scroll', updatePosition);
            };
        }

    }, [selectedComponentId, canvasContent]);


    return (
        <main className="flex h-screen bg-gray-100 font-sans relative overflow-hidden">
            {/* --- Left Sidebar: Component Types & Options --- */}
            {!isPreviewMode && (
                <div className="flex z-10 h-full flex-shrink-0">
                    <div className=" w-20 border-r border-gray-300 bg-white shadow-sm">
                        {types.map((el) => (
                            <div key={el.name} className={`relative flex cursor-pointer flex-col items-center justify-center gap-1.5 py-4 transition-colors ${selectedType === el.name ? 'text-primary bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setSelectedType(el.name)}>
                                {el.icon}
                                <p className="text-xs font-medium">{el.name}</p>
                                {selectedType === el.name && <div className="absolute -right-[1px] top-1/2 -translate-y-1/2 h-8 w-[2px] bg-blue-600 rounded-full" />}
                            </div>
                        ))}
                    </div>
                    <div className="h-full w-72 bg-white border-r border-gray-300 flex flex-col">
                        <h2 className="text-lg font-bold text-gray-800 p-4 border-b border-gray-200 flex-shrink-0">{selectedType}</h2>
                        <div className="overflow-y-auto p-4">
                            {selectedType === "Content" && (
                                <div className="grid grid-cols-2 gap-3">
                                    {typeOptions[selectedType].map((el) => (
                                        <div key={el.name} draggable onDragStart={(e) => handleDragStart(e, el.type)} className="flex cursor-grab flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md hover:border-blue-400 transition-all">
                                            <div className="text-primary">{el.icon}</div>
                                            <p className="text-sm font-semibold text-gray-700">{el.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {selectedType === "Blocks" && (
                                <div className="flex flex-col gap-3">
                                    {typeOptions[selectedType].map((el, ind) => (
                                        <div key={ind} draggable onDragStart={(e) => handleDragStart(e, "Block", { per: el.per })} className="w-full p-2 rounded-md border border-gray-200 hover:border-blue-400 hover:shadow-md cursor-grab transition-all">
                                            <div className="flex w-full gap-1">
                                                {el.per.map((p, pInd) => <div key={pInd} style={{ width: p }} className="h-10 bg-gray-100 rounded-sm flex items-center justify-center"><p className="text-gray-500 text-xs select-none">{p}</p></div>)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* --- Main Canvas Area --- */}
            <div className="flex-1 flex flex-col overflow-hidden" onClick={() => setSelectedComponentId(null)}>
                <div className="flex-shrink-0 flex justify-end items-center gap-4 p-4 bg-white border-b border-gray-200">
                    <button onClick={() => setIsPreviewMode(!isPreviewMode)} className="flex items-center gap-2 bg-gray-500 text-white font-bold py-1 px-4 rounded-lg shadow-md hover:bg-gray-600 transition-colors">
                        {isPreviewMode ? <FaEyeSlash/> : <FaEye />}
                        {isPreviewMode ? 'Exit Preview' : 'Preview'}
                    </button>
                    <button onClick={generateHtml} className="flex items-center gap-2 bg-primary text-white font-bold py-1 px-2 rounded-lg shadow-md hover:bg-opacity-90 transition-colors">
                        <FaSave />
                        Save & Export HTML
                    </button>
                </div>
                <div ref={canvasScrollRef} className="flex-1 overflow-y-auto p-4">
                    <div 
                        className="bg-white w-full max-w-4xl mx-auto rounded-lg shadow-inner border border-gray-200 p-4 min-h-full relative" 
                        onDrop={(e) => handleDrop(e)} 
                        onDragOver={handleDragOver} 
                        onDragLeave={handleDragLeave}
                    >
                        {!isPreviewMode && <QuickAccessToolbar 
                            component={selectedComponent} 
                            position={toolbarPosition}
                            updateComponentProps={updateComponentProps}
                            deleteComponent={deleteComponent}
                            duplicateComponent={duplicateComponent}
                        />}
                        {canvasContent.length > 0 ? renderCanvasContent(canvasContent, isPreviewMode) : (
                            <div className="flex items-center justify-center h-full text-center text-gray-400 text-lg pointer-events-none">
                                <p>Drag and drop components here to start building your template.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- Right Sidebar: Settings Panel --- */}
            {selectedComponent && !isPreviewMode && (
                <SettingsPanel 
                    key={selectedComponent.id} 
                    component={selectedComponent} 
                    updateComponentProps={updateComponentProps}
                    unselectComponent={() => setSelectedComponentId(null)}
                />
            )}

            {/* --- Export HTML Modal --- */}
            {showExportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-full flex flex-col">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b">
                            <h3 className="text-xl font-bold text-gray-800">Exported HTML</h3>
                            <button onClick={() => setShowExportModal(false)} className="p-1 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100">
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <textarea
                            readOnly
                            className="flex-1 w-full p-3 border border-gray-300 rounded-md font-mono text-sm bg-gray-50 resize-none"
                            value={exportedHtml}
                        ></textarea>
                        <div className="mt-4 pt-4 border-t flex justify-end">
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-green-500 disabled:cursor-not-allowed"
                                disabled={copySuccess}
                            >
                                {copySuccess ? 'Copied!' : <><FaClipboard /> Copy to Clipboard</>}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default App;
