

function Table({ headerContent, bodyContents }) {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 3;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const bodyContents = bodyContents.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(bodyContents.length / recordsPerPage);
    const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const changeCurrentPage = (id) => {
        setCurrentPage(id);
    };

    const nextPage = () => {
        if (currentPage !== totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (!bodyContents || bodyContents.length === 0) {
        return <p>Aucune donnée à afficher.</p>;
    }

    const bodyKeys = Object.keys(bodyContents[0]);

    return (
        <div className="relative h-[100%]">
            <table className="relative w-full text-sm text-left rtl:text-right text-primary">
                <thead className="text-xs font-extrabold uppercase bg-gray-50">
                    <tr>
                        {headerContent.map((header, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {bodyContents.map((content, index) => (
                        <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-primary-2 hover:font-semibold"
                        >
                            {bodyKeys.map((key, i) => (
                                <td key={i} className="px-6 py-4 capitalize">
                                    {content[key] ? content[key].toString() : ""}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="absolute bottom-0 right-8" aria-label="Page navigation example">
                    <ul className="flex items-center -space-x-px h-8 text-sm">
                        <li>
                            <button
                                onClick={prevPage}
                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <span className="sr-only">Previous</span>
                                <svg
                                    className="w-2.5 h-2.5 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 1 1 5l4 4"
                                    />
                                </svg>
                            </button>
                        </li>

                        {pageNumbers.map((n) => (
                            <li key={n}>
                                <button
                                    onClick={() => changeCurrentPage(n)}
                                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                                        currentPage === n
                                            ? "text-white bg-primary hover:bg-primary-2"
                                            : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                                    } border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                                >
                                    {n}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={nextPage}
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <span className="sr-only">Next</span>
                                <svg
                                    className="w-2.5 h-2.5 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                            </button>
                        </li>
                    </ul>
            </nav>
        </div>
    );
}

export default Table;
