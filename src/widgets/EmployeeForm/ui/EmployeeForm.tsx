import { Input } from '@shared/ui/Input';
import styles from './styles.module.scss';
import { CustomSelect } from '@shared/ui/CustomSelect';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IForm } from '@widgets/EmployeeForm/model/types';
import { emailPattern } from '@shared/lib/emailPattern';
import InputMask from 'react-input-mask';

export const EmployeeForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      sex: 'male',
    },
  });
  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
    alert('Форма валидна, отправляется запрос');
  };

  const options = [
    { label: 'Мужской', value: 'male' },
    { label: 'Женский', value: 'female' },
  ];

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <h1>Информация о сотруднике</h1>
      <Input
        placeholder="Фамилия"
        {...register('surname', { required: 'Поле является обязательным' })}
        error={!!errors.surname}
      />
      {errors.surname && (
        <span style={{ color: 'red' }}>{errors.surname.message}</span>
      )}
      <Input
        placeholder="Имя"
        {...register('name', { required: 'Поле является обязательным' })}
        error={!!errors.name}
      />
      {errors.name && (
        <span style={{ color: 'red' }}>{errors.name.message}</span>
      )}
      <Input placeholder="Отчество" {...register('patronym')} />
      <div className={styles.metaGrid}>
        <Controller
          render={({ field }) => (
            <CustomSelect
              label="Пол"
              options={options}
              value={options.find((opt) => opt.value === field.value) || null}
              onChange={(option) => field.onChange(option.value)}
            />
          )}
          name="sex"
          control={control}
        />
        <div className={styles.requiredField}>
          <Input
            placeholder="Дата рождения"
            type="date"
            {...register('birthdate', {
              required: 'Поле является обязательным',
            })}
            error={!!errors.birthdate}
          />
          {errors.birthdate && (
            <span style={{ color: 'red' }}>{errors.birthdate.message}</span>
          )}
        </div>
        <div className={styles.requiredField}>
          <InputMask
            mask="+7 (999) 999-99-99"
            alwaysShowMask={false}
            {...register('phone', {
              required: 'Телефон обязателен',
              pattern: {
                value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                message: 'Введите корректный телефон',
              },
            })}
          >
            {(inputProps) => (
              <Input
                {...inputProps}
                placeholder="Мобильный телефон"
                error={!!errors.phone}
              />
            )}
          </InputMask>
          {errors.phone && (
            <span style={{ color: 'red' }}>{errors.phone.message}</span>
          )}
        </div>
        <div className={styles.requiredField}>
          <Input
            placeholder="Email"
            type="email"
            {...register('email', {
              required: 'Поле является обязательным',
              pattern: emailPattern,
            })}
            error={!!errors.email}
          />
          {errors.email && (
            <span style={{ color: 'red' }}>{errors.email.message}</span>
          )}
        </div>
      </div>
      <Input
        placeholder="Адрес постоянной регистрации"
        {...register('address')}
      />
      <Input placeholder="Название работодателя" {...register('job')} />
      <button type="submit" className={styles.button}>
        СОХРАНИТЬ
      </button>
    </form>
  );
};
