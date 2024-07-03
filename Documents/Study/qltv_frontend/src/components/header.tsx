"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isDropdownUser, setIsDropdownUser] = useState(false);
  const [isDropdownCategory, setIsDropdownCategory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleDropdownUser = () => {
    setIsDropdownUser(!isDropdownUser);
  };

  const closeDropdownUser = () => {
    setIsDropdownUser(false);
  };

  const toggleDropdownCategory = () => {
    setIsDropdownCategory(!isDropdownCategory);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (selectedCategory !== "All categories") {
      queryParams.set("category", selectedCategory);
    }
    if (searchQuery) {
      queryParams.set("name", searchQuery);
    }
    router.push(`/library?${queryParams.toString()}`);
  };

  const handleCategorySelect = (category: string) => {
    if (category === "All categories") {
      return;
    }
    const path = `?category=${encodeURIComponent(category)}`;
    router.push(path);
    setIsDropdownCategory(false);
  };

  return (
    <header className="bg-gray-700 shadow-2xl sticky top-0 z-50 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/library"
          className="flex items-center text-2xl font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10 mr-3 text-cyan-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
          </svg>
          <span className="hidden sm:inline">Toan Library</span>
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 mx-4 max-w-[640px] lg:flex hidden"
        >
          <div className="flex w-full">
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-white rounded-lg  border  bg-gray-700  border-gray-600 placeholder-gray-400  "
                placeholder="Search book ..."
                value={searchQuery}
                onChange={handleInputChange}
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
        <div className="relative group">
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onMouseEnter={toggleDropdownUser}
          >
            <div className="text-white hidden sm:inline">Username</div>
            <Image src="/" alt="User" width={50} height={50} className="w-10 h-10 rounded-full" />
          </div>
          {isDropdownUser && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
              onMouseLeave={closeDropdownUser}
            >
              <ul className="py-1">
                <li key={1}>
                  <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                    <Link href="/my-profile">View Detail</Link>
                  </button>
                </li>
                <li key={2}>
                  <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                    <Link href="/">Logout</Link>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
