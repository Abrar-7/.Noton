import { useRouter } from 'next/router';
import FormCreator from '../../../../../../components/form';
const Form = () => {
    const router = useRouter();
    const { formId } = router.query;
  
    // Fetch app-related data using the appId here
  
    return (
      <div>
        <FormCreator/>
              {/* <>
             <h1>formId ID: {formId}</h1>
             <p>formId-related data goes here</p> 
             </> */}
      </div>
    );
  };

  export default Form