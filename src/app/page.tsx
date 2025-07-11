"use client";

import { useEffect, useState } from "react";

type Advocate = {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
};

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    newSearchTerm = newSearchTerm.toLowerCase();

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      // Note: we are delaying searching specialties for performance
      if (
        advocate.firstName.toLowerCase().includes(newSearchTerm) ||
        advocate.lastName.toLowerCase().includes(newSearchTerm) ||
        advocate.city.toLowerCase().includes(newSearchTerm) ||
        advocate.degree.toLowerCase().includes(newSearchTerm) ||
        (!isNaN(Number(newSearchTerm)) &&
          advocate.yearsOfExperience >= Number(newSearchTerm))
      ) {
        return true;
      } else {
        const specialities = advocate.specialties;
        return specialities.some((specialty) => {
          return specialty.toLowerCase().includes(newSearchTerm);
        });
      }
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onResetSearchClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  // Temp corral for components I'm making, todo: extract them out into their own files
  function SearchLabel({ searchString }: { searchString: string }) {
    return (
      <p>
        Searching for: <span> {searchString} </span>
      </p>
    );
  }

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <SearchLabel searchString={searchTerm} />
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onResetSearchClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
