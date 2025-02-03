1--
export  const autoCompleteSearch = (data, searchTerm, key) => {
    if (!searchTerm) return data; // Si aucun terme de recherche, retourner toutes les données
    return data.filter((item) =>
        item[key].toLowerCase().includes(searchTerm.toLowerCase())
    );
};


2--
    const [filteredPermissions, setFilteredPermissions] = useState([]); 
    const [search, setSearch] = useState(""); 

3--
    useEffect(() => {
        const filtered = autoCompleteSearch (permissions, search, "name");
        setFilteredPermissions(filtered);
    }, [search, permissions]);

4--

    <div className="absolute right-4 top-2">
        <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="border rounded-full px-2 py-1 text-sm font-medium w-44"
        />
    </div>

5-- //Usage example

filteredPermissions.length > 0 ? (
    filteredPermissions.map((item, index) => (
        <div
            key={index}
            className="w-full flex bg-white border-b dark:bg-gray-800 text-sm hover:font-semibold"
        >
            <div className="flex-1 flex justify-start px-3 my-2">
                <span
                    key={index}
                    className="mx-2 bg-yellow-first text-black py-1 px-2 rounded-xl flex gap-1"
                >
                    <Icons.permissionIcon color={"black"} />
                    {item.name}
                </span>
            </div>
            <div className="flex-1 flex justify-start px-3 my-2 gap-4">
                {isEditMode && (
                    <>
                        <span
                            onClick={() => {
                                setItemToUpdate(item);
                                showModal();
                            }}
                            className="hover:bg-yellow-50 py-1 px-3 rounded-md"
                        >
                            {Icons.penIcon}
                        </span>
                        <span
                            onClick={() => handleDelete(item.id)}
                            className="hover:bg-red-50 py-1 px-3 rounded-md"
                        >
                            {Icons.trashIcon}
                        </span>
                    </>
                )}
            </div>
        </div>
    ))
)



// useEffect(() => {
    //     // Filtrer les permissions en fonction de la recherche
    //     const filtered = permissions.filter((perm) =>
    //         perm.name.toLowerCase().includes(search.toLowerCase())
    //     );
    //     setFilteredPermissions(filtered);
    // }, [search, permissions]);

 ------------------------------------------------------------
 SearchWith object
 
 const [filteredRoles, setFilteredRoles] = useState([]);
  const [search, setSearch] = useState("");


  if (roles?.data) {
    setFilteredRoles(
      search
        ? roles.data.filter((role) =>
          role.name.toLowerCase().includes(search.toLowerCase())
        )
        : roles.data
    );
  } else {
    setFilteredRoles([]);
  }
}, [search, roles]);


<div className="h-[88%] mt-4 p-2 w-full flex">
<div className="w-[100%] ring-1 ring-primary rounded-md p-2 text-primary">
  <div className="text-xs font-extrabold uppercase bg-gray-50 flex relative">
    {tableHeader.map((h, index) => (
      <div key={index} className="flex-1 flex justify-start py-3 px-4">
        {h}
      </div>
    ))}
    <div className="absolute right-4 top-2">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher..."
        className="border rounded-full px-2 py-1 text-sm font-medium w-44"
      />
    </div>
  </div>
  <div
    id="accordion-flush"
    className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white h-[90%] overflow-y-scroll px-4"
  >
    {loading ? (
      <div className="w-[100%] h-[100%] flex justify-center items-center ">
        {loader.spinner}
      </div>
    ) : filteredRoles.length === 0 ? (
      <div className="py-5 text-center">Aucun rôle disponible.</div>
    ) : (
      filteredRoles.map((item, index) => (
        <div key={item.id}>
          <h2 id={`accordion-flush-heading-${item.id}`}>
            <button
              type="button"
              className="flex items-center justify-between w-full py-2 font-medium text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-2"
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`accordion-flush-body-${item.id}`}
            >
              <span className=" bg-green-first text-white text-sm py-1 px-2 rounded-xl flex gap-1 justify-center items-center">
                <Icons.roleIcon color={'white'} />
                {item.name}
              </span>
              {!isEditMode && (
                <svg
                  className={`text-primary w-3 h-3 shrink-0 ${activeIndex === index && !isEditMode ? 'rotate-180' : ''
                    }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              )}
              {isEditMode && (
                <div className="flex gap-2">
                  <span
                    onClick={() => {
                      setRoleToUpdate(item);
                      showUpdateRoleModal();
                    }}
                    className="hover:bg-yellow-50 py-1 px-3 rounded-md"
                  >
                    {Icons.penIcon}
                  </span>
                  <span
                    onClick={() => handleDelete(item.id)}
                    className="hover:bg-red-50 py-1 px-3 rounded-md"
                  >
                    {Icons.trashIcon}
                  </span>
                </div>
              )}
            </button>
          </h2>
          <div
            id={`accordion-flush-body-${item.id}`}
            className={activeIndex === index ? 'block' : 'hidden'}
            aria-labelledby={`accordion-flush-heading-${item.id}`}
          >
            <div className="py-3 border-b border-gray-200 dark:border-gray-700">
              {item.permissions.length > 0 ? (
                <div className=" pl-5 flex flex-wrap gap-3 ">
                  {item.permissions.map((permission) => (
                    <span
                      key={permission.id}
                      className=" bg-yellow-first text-black text-sm py-1 px-2 rounded-xl flex justify-center items-center gap-1"
                    >
                      <Icons.permissionIcon color={'black'} />
                      {permission.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-primary text-sm">
                  Aucune permission associée.
                </p>
              )}
            </div>
          </div>
        </div>
      ))
    )
    }
  </div>
</div>
</div>