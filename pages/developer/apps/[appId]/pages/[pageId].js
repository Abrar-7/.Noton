import { useRouter } from 'next/router';
import Navbar from '../../../../../components/navbar/Navbar';
import CreatePage from '../../../../../components/createPages/CreatePage';
const PageId = () => {
    const router = useRouter();
    const { pageId } = router.query;
    // const view = JSON.parse(localStorage.getItem("apps"))
    // Fetch app-related data using the appId here
  
    return (
      <div>
        <Navbar/>
        <CreatePage/>
        {/* <h1>pageId ID: {pageId}</h1>
        <p>pageId-related data goes here</p> */}
      </div>
    );
  };

  export default PageId