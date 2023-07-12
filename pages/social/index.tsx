import Layout from 'components/Common/Layout';
import SocialMainLayout from 'components/@feature/@social/Main/SocialMainLayout';
import SocialMainImage from 'components/@feature/@social/Main/SocialMainImage';
import SignInCard from 'components/@feature/@user/SignIn/SignInCard';

const SocialMainPage = () => {
  return (
    <Layout>
      <SocialMainLayout>
        <SignInCard />
        <SocialMainImage />
      </SocialMainLayout>
    </Layout>
  );
};

export default SocialMainPage;
