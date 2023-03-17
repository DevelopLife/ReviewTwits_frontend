import Image from 'next/image';

import * as S from './ImageUploadBox.styles';
import CameraIcon from 'public/images/camera_icon.svg';

const ImageUploadBox = () => {
  return (
    <S.ImageUploadBox>
      <S.ImageUploadButton>
        <Image width={24} height={24} src={CameraIcon} alt="" />
        사진 올리기
      </S.ImageUploadButton>
      <input type="file" accept="image/*" />
      <S.ImageList>
        {[1, 2, 3].map((_, i) => (
          <Image
            key={i}
            width={120}
            height={80}
            src=""
            alt=""
            style={{ background: 'gray' }}
          />
        ))}
      </S.ImageList>
    </S.ImageUploadBox>
  );
};

export default ImageUploadBox;
