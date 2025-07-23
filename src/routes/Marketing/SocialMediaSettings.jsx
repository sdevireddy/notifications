import React from 'react';
import { useParams } from 'react-router-dom';
import CredentialForm from './CredentialForm';

const validPlatforms = ['facebook', 'twitter', 'instagram', 'linkedin'];

const SocialMediaSettings = () => {
  const { platform } = useParams();

  if (!validPlatforms.includes(platform)) {
    return <p className="text-red-600 text-center mt-10">Invalid social platform.</p>;
  }

  return <CredentialForm platform={platform} />;
};

export default SocialMediaSettings;