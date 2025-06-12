import React, { useState } from "react";
import Select from "react-select";
//import "./FiltersPopup.css";

const FiltersPopUp = ({ onClose }) => {
  const [leadOwner, setLeadOwner] = useState([]);
  const [company, setCompany] = useState([]);
  const [leadStatus, setLeadStatus] = useState([]);
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [leadSource, setLeadSource] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [fax, setFax] = useState("");
  const [mobile, setMobile] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [noOfEmployees, setNoOfEmployees] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [rating, setRating] = useState("");
  const [emailOptOut, setEmailOptOut] = useState(false);
  const [skypeId, setSkypeId] = useState("");
  const [secondaryEmail, setSecondaryEmail] = useState("");
  const [twitter, setTwitter] = useState("");
  const [description, setDescription] = useState("");

  const handleClearAll = () => {
    setLeadOwner([]);
    setCompany([]);
    setLeadStatus([]);
    setCountry([]);
    setCity([]);
    setLeadSource([]);
    setFirstName("");
    setLastName("");
    setTitle("");
    setEmail("");
    setFax("");
    setMobile("");
    setWebsite("");
    setIndustry("");
    setNoOfEmployees("");
    setAnnualRevenue("");
    setRating("");
    setEmailOptOut(false);
    setSkypeId("");
    setSecondaryEmail("");
    setTwitter("");
    setDescription("");
  };

  return (
    <div className="filter-popup">
      <div className="filter-header">
        <h2 className="filter-title">Filter Leads</h2>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
      <div className="filter-body">
        <div className="filter-row">
          <label>First Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="filter-row">
          <label>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Fax</label>
          <input type="text" value={fax} onChange={(e) => setFax(e.target.value)} />
          <label>Mobile</label>
          <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </div>
        <div className="filter-row">
          <label>Website</label>
          <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
          <label>Industry</label>
          <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} />
          <label>No. of Employees</label>
          <input type="text" value={noOfEmployees} onChange={(e) => setNoOfEmployees(e.target.value)} />
        </div>
        <div className="filter-row">
          <label>Annual Revenue</label>
          <input type="text" value={annualRevenue} onChange={(e) => setAnnualRevenue(e.target.value)} />
          <label>Rating</label>
          <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
          <label>Skype ID</label>
          <input type="text" value={skypeId} onChange={(e) => setSkypeId(e.target.value)} />
        </div>
        <div className="filter-row">
          <label>Lead Owner</label>
          <Select options={[]} isMulti value={leadOwner} onChange={setLeadOwner} />
          <label>Company</label>
          <Select options={[]} isMulti value={company} onChange={setCompany} />
          <label>Lead Status</label>
          <Select options={[]} isMulti value={leadStatus} onChange={setLeadStatus} />
        </div>
        <div className="filter-row">
          <label>Country</label>
          <Select options={[]} isMulti value={country} onChange={setCountry} />
          <label>City</label>
          <Select options={[]} isMulti value={city} onChange={setCity} />
          <label>Lead Source</label>
          <Select options={[]} isMulti value={leadSource} onChange={setLeadSource} />
        </div>
      </div>
      <div className="filter-footer">
        <button className="clear-all-btn" onClick={handleClearAll}>Clear All</button>
        <button className="search-btn">Search</button>
      </div>
    </div>
  );
};

export default FiltersPopUp;
