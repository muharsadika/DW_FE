/* eslint-disable no-unused-vars */
import React, { useState, useEffect, ChangeEvent } from 'react';
import './App.css';

interface Province {
  id: string;
  name: string;
}

interface Regency {
  id: string;
  name: string;
  province_id: string;
}

interface District {
  id: string;
  name: string;
  regency_id: string;
}

interface Village {
  id: string;
  name: string;
  district_id: string;
}

function App() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedRegency, setSelectedRegency] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedVillage, setSelectedVillage] = useState<string>('');

  useEffect(() => {
    // Fetch data from the provinces API
    fetch('https://raw.githubusercontent.com/vionaaindah/GeoID-API/main/provinces.json')
      .then((response) => response.json())
      .then((data) => setProvinces(data));

    // Fetch data from the regencies API
    fetch('https://raw.githubusercontent.com/vionaaindah/GeoID-API/main/regencies.json')
      .then((response) => response.json())
      .then((data) => setRegencies(data));

    // Fetch data from the districts API
    fetch('https://raw.githubusercontent.com/vionaaindah/GeoID-API/main/districts.json')
      .then((response) => response.json())
      .then((data) => setDistricts(data));

    // Fetch data from the villages API
    fetch('https://raw.githubusercontent.com/vionaaindah/GeoID-API/main/villages.json')
      .then((response) => response.json())
      .then((data) => setVillages(data));
  }, []);

  const handleProvinceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value);
    setSelectedRegency('');
    setSelectedDistrict('');
    setSelectedVillage('');
  };

  const handleRegencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegency(e.target.value);
    setSelectedDistrict('');
    setSelectedVillage('');
  };

  const handleDistrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedVillage('');
  };

  const handleVillageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedVillage(e.target.value);
  };

  const filteredRegencies = regencies.filter((regency) => regency.province_id === selectedProvince);
  const filteredDistricts = districts.filter((district) => district.regency_id === selectedRegency);
  const filteredVillages = villages.filter((village) => village.district_id === selectedDistrict);

  return (
    <div>
      <h1>GeoID Data</h1>
      <h2>Select Province</h2>
      <select onChange={handleProvinceChange} value={selectedProvince}>
        <option value="">Select Province</option>
        {provinces.map((province) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>

      <h2>Select Regency</h2>
      <select onChange={handleRegencyChange} value={selectedRegency}>
        <option value="">Select Regency</option>
        {filteredRegencies.map((regency) => (
          <option key={regency.id} value={regency.id}>
            {regency.name}
          </option>
        ))}
      </select>

      <h2>Select District</h2>
      <select onChange={handleDistrictChange} value={selectedDistrict}>
        <option value="">Select District</option>
        {filteredDistricts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>

      <h2>Select Village</h2>
      <select onChange={handleVillageChange} value={selectedVillage}>
        <option value="">Select Village</option>
        {filteredVillages.map((village) => (
          <option key={village.id} value={village.id}>
            {village.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;



// import React, { Component } from 'react';
// import './App.css';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       provinces: [],
//       regencies: [],
//       districts: [],
//       villages: [],
//       selectedProvince: '',
//       selectedRegency: '',
//       selectedDistrict: '',
//       selectedVillage: '',
//     };
//   }

//   componentDidMount() {
//     // Fetch data from the provinces API
//     fetch('https://raw.githubusercontent.com/vionaaindah/GeoID-API/main/provinces.json')
//       .then((response) => response.json())
//       .then((data) => this.setState({ provinces: data }));

//     // Fetch data from the regencies API
//     fetch('https://raw.githubusercontent.com/vionaaindah/GeoID-API/main/regencies.json')
//       .then((response) => response.json())
//       .then((data) => this.setState({ regencies: data }));

//     // Fetch data from the districts API
//     fetch('https://raw.githubusercontent.com/vionaaindah/GeoID-API/main/districts.json')
//       .then((response) => response.json())
//       .then((data) => this.setState({ districts: data }));

//     // Fetch data from the villages API
//     fetch('https://raw.githubusercontent.com/vionaaindah/GeoID-API/main/villages.json')
//       .then((response) => response.json())
//       .then((data) => this.setState({ villages: data }));
//   }

//   handleProvinceChange = (e) => {
//     this.setState({
//       selectedProvince: e.target.value,
//       selectedRegency: '',
//       selectedDistrict: '',
//       selectedVillage: '',
//     });
//   };

//   handleRegencyChange = (e) => {
//     this.setState({
//       selectedRegency: e.target.value,
//       selectedDistrict: '',
//       selectedVillage: '',
//     });
//   };

//   handleDistrictChange = (e) => {
//     this.setState({
//       selectedDistrict: e.target.value,
//       selectedVillage: '',
//     });
//   };

//   handleVillageChange = (e) => {
//     this.setState({
//       selectedVillage: e.target.value,
//     });
//   };

//   render() {
//     const {
//       provinces,
//       regencies,
//       districts,
//       villages,
//       selectedProvince,
//       selectedRegency,
//       selectedDistrict,
//       selectedVillage,
//     } = this.state;

//     const filteredRegencies = regencies.filter(
//       (regency) => regency.province_id === selectedProvince
//     );
//     const filteredDistricts = districts.filter(
//       (district) => district.regency_id === selectedRegency
//     );
//     const filteredVillages = villages.filter(
//       (village) => village.district_id === selectedDistrict
//     );

//     return (
//       <div>
//         <h1>GeoID Data</h1>
//         <h2>Select Province</h2>
//         <select onChange={this.handleProvinceChange} value={selectedProvince}>
//           <option value="">Select Province</option>
//           {provinces.map((province) => (
//             <option key={province.id} value={province.id}>
//               {province.name}
//             </option>
//           ))}
//         </select>

//         <h2>Select Regency</h2>
//         <select onChange={this.handleRegencyChange} value={selectedRegency}>
//           <option value="">Select Regency</option>
//           {filteredRegencies.map((regency) => (
//             <option key={regency.id} value={regency.id}>
//               {regency.name}
//             </option>
//           ))}
//         </select>

//         <h2>Select District</h2>
//         <select onChange={this.handleDistrictChange} value={selectedDistrict}>
//           <option value="">Select District</option>
//           {filteredDistricts.map((district) => (
//             <option key={district.id} value={district.id}>
//               {district.name}
//             </option>
//           ))}
//         </select>

//         <h2>Select Village</h2>
//         <select onChange={this.handleVillageChange} value={selectedVillage}>
//           <option value="">Select Village</option>
//           {filteredVillages.map((village) => (
//             <option key={village.id} value={village.id}>
//               {village.name}
//             </option>
//           ))}
//         </select>
//       </div>
//     );
//   }
// }

// export default App;


























// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
