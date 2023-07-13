import { FC } from 'react';
import AppLayout from '../../../layouts/app';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/card';
import Text from '../../../components/input/input';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/button';
import AuthService from '../../../api/v1/auth';
import { setUser } from '../../../store/auth';
import { redirect } from 'react-router-dom';
import { deleteCookie } from '../../../utils/cookie';

const AppProfilePage: FC = () => {
  const user = useSelector((state: any) => state.auth.user);
  const { t } = useTranslation();
  const authService = new AuthService();
  const dispatch = useDispatch();

  const handleSubmitUpdateName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await authService.updateMe({
      name: formData.get('name') as string,
    });

    dispatch(setUser(response));
  };

  const handleSubmitUpdatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await authService.updatePassword({
      old_password: formData.get('old_password') as string,
      new_password: formData.get('new_password') as string,
      confirm_password: formData.get('confirm_password') as string,
    });

    dispatch(setUser(response));

    const form = document.querySelector('.js-form-update-password') as HTMLFormElement;
    form.reset();
  };

  const handleSubmitDeleteAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (window.confirm(t('are-you-sure'))) {
      await authService.deleteMe();
      deleteCookie('token');
      dispatch(setUser(null));
      window.location.href = '/';
    }
  };

  return (
    <AppLayout>
      <Card>
        <h1 className="mb-5">{t('profile')}</h1>
        <hr className="my-5" />

        <h3 className="mb-5">{t('change-name')}</h3>
        <form onSubmit={handleSubmitUpdateName}>
          <Text
            label={t('name')}
            placeholder={t('name')}
            name="name"
            required
            defaultValue={user?.name}
          />
          <Button type="submit" label={t('save')} />
        </form>

        <hr className="my-5" />

        <h3 className="mb-5">{t('change-password')}</h3>
        <form onSubmit={handleSubmitUpdatePassword} className="js-form-update-password">
          <Text
            label={t('old-password')}
            placeholder={t('old-password')}
            name="old_password"
            type="password"
            required
          />

          <Text
            label={t('new-password')}
            placeholder={t('new-password')}
            name="new_password"
            type="password"
            required
          />

          <Text
            label={t('confirm-password')}
            placeholder={t('confirm-password')}
            name="confirm_password"
            type="password"
            required
          />

          <Button type="submit" label={t('save')} />
        </form>

        <hr className="my-5" />

        <h3 className="mb-5">{t('delete-account')}</h3>
        <form onSubmit={handleSubmitDeleteAccount}>
          <Text
            label={t('password')}
            placeholder={t('password')}
            name="password"
            type="password"
            required
          />

          <Button type="submit" label={t('delete')} buttonType="danger" />
        </form>
      </Card>
    </AppLayout>
  );
};

export default AppProfilePage;
