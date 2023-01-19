import { useRouter } from 'next/router';
import Landing from '../../../../components/landing/landing';
const AppPage1 = () => {
    const router = useRouter();
    const { appId } = router.query;
  
    // Fetch app-related data using the appId here
  
    return (
      <div>
        <Landing />
      </div>
    );
  };

  export default AppPage1