import React, { useState } from "react";
import { FaFolder, FaFolderOpen, FaFileCode } from "react-icons/fa";
import { MdOutlineExpandMore, MdOutlineChevronRight } from "react-icons/md";
import { Header, Footer } from "../index";
import { useLocation, useParams } from "react-router-dom";
import './Rules.css';

const mockData = {
  name: "Decision Support System",
  packages: [
    {
      name: "Package 1",
      subPackages: [
        {
          name: "Sub Package A",
          rules: [
            { id: 1, name: "Rule 1", drl: "rule \"Rule 1\" when ... then ..." },
            { id: 2, name: "Rule 2", drl: "rule \"Rule 2\" when ... then ..." },
          ],
        },
        {
          name: "Sub Package B",
          rules: [{ id: 3, name: "Decision Table", drl: "Decision table content" }],
        },
      ],
    },
    {
      name: "Package 2",
      subPackages: [],
    },
  ],
};

const Rules = () => {
  const [expanded, setExpanded] = useState({});
  const [selectedRule, setSelectedRule] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const serviceName = location.state?.serviceName || `Service ${id}`;

  const toggleExpand = (path) => {
    setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  return (
    <>
      <Header />
      <div className="flex-container">
  {/* Left Panel - Tree Navigation */}
  <div className="left-panel">
    <h2 className="flex items-center">
      <FaFolder className="mr-2 text-yellow-500" /> Medical Necessity
    </h2>

    {mockData.packages.map((pkg, index) => (
      <div key={index}>
        <div className="folder" onClick={() => toggleExpand(`pkg-${index}`)}>
          {expanded[`pkg-${index}`] ? <MdOutlineExpandMore /> : <MdOutlineChevronRight />}
          <FaFolder className="ml-2 text-yellow-500" />
          <span className="ml-2">{pkg.name}</span>
        </div>

        {expanded[`pkg-${index}`] &&
          pkg.subPackages.map((subPkg, subIndex) => (
            <div key={subIndex} className="ml-4">
              <div className="folder" onClick={() => toggleExpand(`sub-${index}-${subIndex}`)}>
                {expanded[`sub-${index}-${subIndex}`] ? <MdOutlineExpandMore /> : <MdOutlineChevronRight />}
                <FaFolderOpen className="ml-2 text-blue-500" />
                <span className="ml-2">{subPkg.name}</span>
              </div>

              {expanded[`sub-${index}-${subIndex}`] &&
                subPkg.rules.map((rule) => (
                  <div
                    key={rule.id}
                    className={`file ${selectedRule?.id === rule.id ? "active" : ""}`}
                    onClick={() => setSelectedRule(rule)}
                  >
                    <FaFileCode />
                    {rule.name}
                  </div>
                ))}
            </div>
          ))}
      </div>
    ))}
  </div>

  {/* Right Panel - Rule Editor */}
  <div className="right-panel">
    <h2 className="flex items-center">
      <FaFileCode className="mr-2 text-green-500" /> Rule Editor
    </h2>

    {selectedRule ? (
      <div className="rule-editor">
        <h3 className="flex items-center">
          <FaFileCode className="mr-2 text-gray-600" /> {selectedRule.name}
        </h3>
        <pre className="code-box">{selectedRule.drl}</pre>
      </div>
    ) : (
      <p className="text-gray-500">Select a rule to view its DRL code</p>
    )}
  </div>
</div>




      <Footer />
    </>
  );
};

export default Rules;
