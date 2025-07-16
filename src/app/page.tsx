"use client";

import { ReactNode, useEffect, useState } from "react";

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
    console.log("resetting search...");
    console.log(advocates);

    setFilteredAdvocates(advocates);
    setSearchTerm("");
  };

  // Temp corral for components I'm making, todo: extract them out into their own files
  function SearchLabel({ searchString }: { searchString: string }) {
    return (
      <p className="px-1 text-default-green text-lg font-medium">
        Searching for: <span> {searchString} </span>
      </p>
    );
  }

  function TableHeaderCell({ text }: { text: string }) {
    return <th className="text-left pr-4 pb-4">{text}</th>;
  }

  function TableBodyCell({
    text,
    children,
  }: {
    text?: string;
    children?: ReactNode;
  }) {
    return <td className="align-top pr-2 py-2 max-w-md">{children ?? text}</td>;
  }

  function PhoneNumberFormat(phoneNumber: number) {
    let strNumber = String(phoneNumber);
    return (
      strNumber.substring(0, 3) +
      "-" +
      strNumber.substring(3, 6) +
      "-" +
      strNumber.substring(6)
    );
  }

  return (
    <main style={{ margin: "24px" }}>
      <h1 className="py-4 text-default-green text-6xl font-medium font-serif border-b-4 border-gold">
        Solace Advocates
      </h1>
      <br />
      <br />
      <div>
        <SearchLabel searchString={searchTerm} />
        <input
          className="px-4 py-2 border border-default-green rounded-md"
          value={searchTerm}
          onChange={onChange}
          placeholder="Search"
        />
        <button
          className="appearance-none mx-4 my-2 px-4 py-2 border rounded-full bg-default-green text-default-white"
          onClick={onResetSearchClick}
        >
          Reset Search
        </button>
      </div>
      <br />
      <div className="px-2 py-2 mb-16 border-y border-neutral-grey shadow-xl overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-accent-mid-green">
              <TableHeaderCell text="First Name" />
              <TableHeaderCell text="Last Name" />
              <TableHeaderCell text="City" />
              <TableHeaderCell text="Degree" />
              <TableHeaderCell text="Specialties" />
              <TableHeaderCell text="Years of Experience" />
              <TableHeaderCell text="Phone Number" />
            </tr>
          </thead>
          <tbody>
            {filteredAdvocates.map((advocate) => {
              return (
                <tr
                  key={advocate.id}
                  className="border-b border-accent-mid-green"
                >
                  <TableBodyCell text={advocate.firstName} />
                  <TableBodyCell text={advocate.lastName} />
                  <TableBodyCell text={advocate.city} />
                  <TableBodyCell text={advocate.degree} />
                  <TableBodyCell>
                    <div className="flex flex-wrap gap-1">
                      {advocate.specialties.map((s, index) => (
                        <span
                          key={index}
                          className="bg-accent-mid-green rounded-xl px-2 py-0.5 text-default-white"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </TableBodyCell>
                  <TableBodyCell text={String(advocate.yearsOfExperience)} />
                  <TableBodyCell
                    text={PhoneNumberFormat(advocate.phoneNumber)}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
