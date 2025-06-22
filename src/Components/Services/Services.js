import React, { useState, useEffect } from "react";
import { FaFolder, FaFolderOpen, FaFileCode } from "react-icons/fa";
import { MdOutlineExpandMore, MdOutlineChevronRight } from "react-icons/md";
// If you have Header and Footer, import them. Otherwise remove them.
import { Header, Footer } from "../index";
import "./Services.css";

const mockServiceData = {
  name: "Healthcare Services",
  services: [
    {
      name: "Services 1",
      packages: [
        {
          name: "Package A",
          rules: [
            {
              id: 1,
              name: "Rule 1",
              conditions: "Enter conditions here",
              messageOn: "Activity",
              serviceSubtype: "",
              serviceCode: "",
              rank: "",
              severity: "",
              risk: 0,
              comment: "",
              denialCode: "",
              format: "Drools",
              generatedCode: "// Generated code here",
            },
            {
              id: 2,
              name: "Rule 2",
              conditions: "Enter conditions here",
              messageOn: "Diagnosis",
              serviceSubtype: "",
              serviceCode: "",
              rank: "",
              severity: "",
              risk: 50,
              comment: "",
              denialCode: "",
              format: "Drools",
              generatedCode: "// Generated code here",
            },
          ],
        },
      ],
    },
    {
      name: "Services 2",
      packages: [],
    },
  ],
};

const Services = () => {
  const [expanded, setExpanded] = useState({});
  const [selectedRule, setSelectedRule] = useState(null);

  // Conditions text area
  const [conditions, setConditions] = useState("");

  // Generated code text area
  const [generatedCode, setGeneratedCode] = useState("");

  // Action part fields
  const [ruleDetails, setRuleDetails] = useState({
    messageOn: "Activity",
    serviceSubtype: "",
    serviceCode: "",
    rank: "",
    severity: "",
    risk: 0,
    comment: "",
    denialCode: "",
    format: "Drools",
  });

  // Whenever we select a new rule, update the state
  useEffect(() => {
    if (selectedRule) {
      setConditions(selectedRule.conditions);
      setGeneratedCode(selectedRule.generatedCode);
      setRuleDetails({
        messageOn: selectedRule.messageOn,
        serviceSubtype: selectedRule.serviceSubtype,
        serviceCode: selectedRule.serviceCode,
        rank: selectedRule.rank,
        severity: selectedRule.severity,
        risk: selectedRule.risk,
        comment: selectedRule.comment,
        denialCode: selectedRule.denialCode,
        format: selectedRule.format,
      });
    }
  }, [selectedRule]);

  const toggleExpand = (path) => {
    setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  // Handle conditions text changes
  const handleConditionsChange = (e) => {
    setConditions(e.target.value);
  };

  // Handle changes in the action part form
  const handleRuleDetailsChange = (e) => {
    const { name, value } = e.target;
    setRuleDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Generate code (placeholder logic)
  const handleGenerateCode = () => {
    const generated = `// Generated code based on conditions and actions`;
    setGeneratedCode(generated);
  };

  // Save rule (placeholder logic)
  const handleSave = () => {
    alert("Rule saved!");
  };

  return (
    <>
      <Header />
      <div className="services-page">
        <div className="three-column-container">
          {/* LEFT COLUMN: Tree Navigation */}
          <div className="left-column">
            <h2 className="panel-title">Services</h2>

            {mockServiceData.services.map((service, sIndex) => (
              <div key={sIndex}>
                <div
                  className="folder"
                  onClick={() => toggleExpand(`service-${sIndex}`)}
                >
                  {expanded[`service-${sIndex}`] ? (
                    <MdOutlineExpandMore />
                  ) : (
                    <MdOutlineChevronRight />
                  )}
                  <FaFolder className="ml-2 text-yellow-500" />
                  <span className="ml-2">{service.name}</span>
                </div>

                {expanded[`service-${sIndex}`] &&
                  service.packages.map((pkg, pIndex) => (
                    <div key={pIndex} className="ml-4">
                      <div
                        className="folder"
                        onClick={() =>
                          toggleExpand(`package-${sIndex}-${pIndex}`)
                        }
                      >
                        {expanded[`package-${sIndex}-${pIndex}`] ? (
                          <MdOutlineExpandMore />
                        ) : (
                          <MdOutlineChevronRight />
                        )}
                        <FaFolderOpen className="ml-2 text-blue-500" />
                        <span className="ml-2">{pkg.name}</span>
                      </div>

                      {expanded[`package-${sIndex}-${pIndex}`] &&
                        pkg.rules.map((rule) => (
                          <div
                            key={rule.id}
                            className={`file ${
                              selectedRule?.id === rule.id ? "active" : ""
                            }`}
                            onClick={() => setSelectedRule(rule)}
                          >
                            <FaFileCode />
                            <span className="ml-1">{rule.name}</span>
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* CENTER COLUMN: Conditions + Arrow + Action Part */}
          <div className="center-column">
            <div className="conditions-part">
              <h3>Conditions</h3>
              <textarea
                value={conditions}
                onChange={handleConditionsChange}
                placeholder="Enter conditions here"
                disabled={!selectedRule}
              />
            </div>

            <div className="action-part">
              <h3>Action Part</h3>
              {selectedRule ? (
                <>
                  <div className="form-grid">
                    <label>Message On:</label>
                    <select
                      name="messageOn"
                      value={ruleDetails.messageOn}
                      onChange={handleRuleDetailsChange}
                    >
                      <option value="Activity">Activity</option>
                      <option value="Diagnosis">Diagnosis</option>
                      <option value="Encounter">Encounter</option>
                      <option value="Observation">Observation</option>
                    </select>

                    <label>Service Subtype:</label>
                    <input
                      type="text"
                      name="serviceSubtype"
                      value={ruleDetails.serviceSubtype}
                      onChange={handleRuleDetailsChange}
                      placeholder="Service Subtype"
                    />

                    <label>Service Code:</label>
                    <input
                      type="text"
                      name="serviceCode"
                      value={ruleDetails.serviceCode}
                      onChange={handleRuleDetailsChange}
                      placeholder="Service Code"
                    />

                    <label>Rank:</label>
                    <input
                      type="text"
                      name="rank"
                      value={ruleDetails.rank}
                      onChange={handleRuleDetailsChange}
                      placeholder="Rank"
                    />

                    <label>Severity:</label>
                    <input
                      type="text"
                      name="severity"
                      value={ruleDetails.severity}
                      onChange={handleRuleDetailsChange}
                      placeholder="Severity"
                    />

                    <label>Risk (0-100):</label>
                    <input
                      type="number"
                      name="risk"
                      value={ruleDetails.risk}
                      onChange={handleRuleDetailsChange}
                      min="0"
                      max="100"
                    />

                    <label>Comment:</label>
                    <input
                      type="text"
                      name="comment"
                      value={ruleDetails.comment}
                      onChange={handleRuleDetailsChange}
                      placeholder="Comment"
                    />

                    <label>Denial Code:</label>
                    <input
                      type="text"
                      name="denialCode"
                      value={ruleDetails.denialCode}
                      onChange={handleRuleDetailsChange}
                      placeholder="Denial Code"
                    />

                    <label>Format:</label>
                    <input
                      type="text"
                      name="format"
                      value={ruleDetails.format}
                      readOnly
                    />
                  </div>

                  <div className="action-buttons">
                    <button className="save-button" onClick={handleSave}>
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <p className="placeholder-text">Select a rule to edit actions</p>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Generated Code */}
          <div className="right-column">
            <h3>Rule Editor</h3>
            <textarea
              value={generatedCode}
              readOnly
              className="code-box"
              placeholder="// Generated code will appear here"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Services;
