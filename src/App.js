import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
        "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
      <div>
        <Tabbed content={content} />
      </div>
  );
}

console.log(<DifferentContent test={16} />);
/*
{$$typeof: Symbol(react.element), key: null, ref: null, props: {…}, type: ƒ, …}
    $$typeof: Symbol(react.element)
    key: null
    props: {test: 16}
    ref: null
    type: ƒ DifferentContent()
    _owner: null
    _store: {validated: false}
    _self: undefined
    _source: {fileName: '/home/yungshun/workspace/js/react-tabs/src/App.js', lineNumber: 29, columnNumber: 13}
    [[Prototype]]: Object
*/
// Not a React component
console.log(DifferentContent());
/*
{$$typeof: Symbol(react.element), type: 'div', key: null, ref: null, props: {…}, …}
    $$typeof: Symbol(react.element)
    key: null
    props: {className: 'tab-content', children: {…}}
    ref: null
    type: "div"
    _owner: null
    _store: {validated: false}
    _self: undefined
    _source: {fileName: '/home/yungshun/workspace/js/react-tabs/src/App.js', lineNumber: 113, columnNumber: 7}
    [[Prototype]]: Object
*/

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
      <div>
        <div className="tabs">
          <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
          <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
          <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
          <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
        </div>

        {/* `key` needs to be unique */}
        {activeTab <= 2 ? (
            <TabContent
                item={content.at(activeTab)}
                key={content.at(activeTab).summary}
            />
        ) : (
            <DifferentContent />
        )}
      </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
      <button
          className={activeTab === num ? "tab active" : "tab"}
          onClick={() => onClick(num)}
      >
        Tab {num + 1}
      </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes(likes + 1);
  }

  return (
      <div className="tab-content">
        <h4>{item.summary}</h4>
        {showDetails && <p>{item.details}</p>}

        <div className="tab-actions">
          <button onClick={() => setShowDetails((h) => !h)}>
            {showDetails ? "Hide" : "Show"} details
          </button>

          <div className="hearts-counter">
            <span>{likes} ❤️</span>
            <button onClick={handleInc}>+</button>
            <button>+++</button>
          </div>
        </div>

        <div className="tab-undo">
          <button>Undo</button>
          <button>Undo in 2s</button>
        </div>
      </div>
  );
}

function DifferentContent() {
  return (
      <div className="tab-content">
        <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
      </div>
  );
}