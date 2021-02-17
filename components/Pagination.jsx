import Link from "next/link";

const Pagination = ({currentPage, limitReached, pathName, pageType, searchTerm}) => {
    const path = pageType == "category" ? pathName : pageType;
    const formatLinkHref = (pageLevel,pageStep) => {
        if(searchTerm){
            return {
                q: searchTerm,
                page: pageLevel == "forward" ? Number(currentPage) + pageStep : Number(currentPage) - pageStep
            }
        }else if(searchTerm === false || pageType == "category"){
            return {
                page: pageLevel == "forward" ? Number(currentPage) + pageStep : Number(currentPage) - pageStep
            }
        }
    }
    if(currentPage == 1){
        return  (
            <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                <span className="page-link">Previous</span>
                </li>
                <li className="page-item active">
                <span className="page-link">
                            {currentPage}
                    <span className="sr-only">(current)</span>
                </span>
                        </li>
                <li className="page-item">
                    <Link 
                        href={{
                            pathname: path,
                            query: formatLinkHref("forward",1)
                    }} 
                    >
                            <a className="page-link" >{+currentPage + 1}</a>
                          </Link>
                        </li>
                <li className="page-item">
                    <Link 
                        href={{
                            pathname: path,
                            query: formatLinkHref("forward",2)
                    }} 
                    >
                            <a className="page-link" >{+currentPage + 2}</a>
                          </Link>
                        </li>
                <li className="page-item">
                    <Link 
                        href={{
                            pathname: path,
                            query: formatLinkHref("forward",1)
                    }} 
                    >
                            <a className="page-link" >Next</a>
                          </Link>
                        </li>
        </ul>
</nav>
        )
    }
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                <Link 
                    href={{
                        pathname: path,
                        query: formatLinkHref("back",1)
                }} 
                >
                        <a className="page-link" >Previous</a>
                      </Link>
                    </li>
                
                <li className="page-item">
                    <Link 
                        href={{
                            pathname: path,
                            query: formatLinkHref("back",1)
                    }} 
                    >
                            <a className="page-link" >{currentPage - 1}</a>
                          </Link>
                        </li>
                <li className="page-item active">
                        <span className="page-link">
                            {currentPage}
                <span className="sr-only">(current)</span>
            </span>
                        </li>
                <li className="page-item">
                    <Link 
                        href={{
                            pathname: path,
                            query: formatLinkHref("forward",1)
                    }} 
                    >
                            <a className="page-link" >{+currentPage + 1}</a>
                          </Link>
                        </li>
                <li className="page-item">
                    <Link 
                        href={{
                            pathname: path,
                            query: formatLinkHref("forward",1)
                    }} 
                    >
                            <a className="page-link" >Next</a>
                          </Link>
                        </li>
        </ul>
</nav>
    )
}

export default Pagination;