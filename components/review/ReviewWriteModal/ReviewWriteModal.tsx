import { useEffect } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import useForm from 'hooks/useForm';
import { ReviewResponseType, ReviewType } from 'typings/reviews';
import { shoppingAPI } from 'api/reviews';

import * as S from './ReviewWriteModal.styles';
import ServiceSection from './ServiceSection/@index';
import QualitySection from './QualitySection/@index';
import { validateReviewContent, validateReviewScore } from 'utils/validate';
import {
  DEFAULT_REVIEW_WRITE_ERRORS,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from 'constants/reviews';

const ReviewWriteModal = () => {
  const router = useRouter();
  const reviewId = Number(router?.query?.id);
  const isEditPage = router?.query?.id;
  const { data: reviewData, isLoading } = useQuery<ReviewResponseType>(
    ['review', reviewId],
    () => shoppingAPI.getReviewDetail(reviewId),
    {
      enabled: !!reviewId,
    }
  );
  const {
    values,
    isSubmitable,
    setValue,
    setErrors,
    initializeForm,
    handleChange,
    handleSubmit,
  } = useForm<ReviewType>({
    productURL: 'http://www.example.com/123',
    content: '',
    score: 0,
  });
  const { mutate: mutateCreate } = useMutation(
    (formData: FormData) => shoppingAPI.createReview(formData),
    {
      onSuccess: ({ status }) => {
        switch (status) {
          case 200:
            alert(SUCCESS_MESSAGE.CREATE);
            router.push('/review');
            break;
        }
      },
      onError: ({ response }) => {
        switch (response?.status) {
          case 400:
            alert(response.data[0].message);
            break;
        }
      },
    }
  );

  const setDataInToFormData = () => {
    const formData = new FormData();
    const { productURL, content, score, imageFiles } = values;

    formData.append('score', score.toString());
    formData.append('content', content);
    formData.append('productURL', productURL);
    imageFiles?.forEach((image) =>
      formData.append('multipartImageFiles', image)
    );

    return formData;
  };

  const validateReviewWriteForm = (values: ReviewType) => {
    const { content, score } = values;
    const errors = { ...DEFAULT_REVIEW_WRITE_ERRORS };

    const isValidContent = validateReviewContent(content);
    const isValidScore = validateReviewScore(score);

    if (!isValidContent) errors.content = ERROR_MESSAGE.NULL_CONTENT;
    if (!isValidScore) errors.score = ERROR_MESSAGE.NULL_SCORE;

    return errors;
  };

  const onValid = async () => {
    if (!values || !isSubmitable) return;

    const formData = setDataInToFormData();
    mutateCreate(formData);
  };

  useEffect(() => {
    const newErrors = validateReviewWriteForm(values);
    setErrors(newErrors);
  }, [values, setErrors]);

  useEffect(() => {
    // CSR 임시
    if (reviewData) {
      const { content, score, productUrl } = reviewData;
      initializeForm({
        productURL: productUrl,
        content,
        score,
      });
    }
  }, [reviewData, initializeForm]);

  if (isLoading) return null;
  return (
    <S.Container>
      <S.Title>리뷰 관리</S.Title>
      <S.TitleLine />
      <S.Form onSubmit={(e) => handleSubmit(e, onValid)}>
        <S.ReviewContent>
          <ServiceSection />
          <S.SectionLine />
          <QualitySection
            data={reviewData}
            values={values}
            setValue={setValue}
            handleChange={handleChange}
          />
        </S.ReviewContent>
        <S.ButtonWrap>
          <S.CreateButton type="submit" disabled={!isSubmitable}>
            {isEditPage ? '수정 완료' : '작성 완료'}
          </S.CreateButton>
        </S.ButtonWrap>
      </S.Form>
    </S.Container>
  );
};

export default ReviewWriteModal;
