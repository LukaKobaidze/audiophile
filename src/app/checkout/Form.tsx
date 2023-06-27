import { useState } from 'react';
import { IconCashOnDelivery } from '@/icons';
import { Input, Paragraph, Subtitle } from '@/components';
import { nameValidation } from './validations';
import styles from './Form.module.scss';

type PaymentMethodType = 'Cash on Delivery' | 'e-Money';
type InputStateType = {
  value: string;
  error?: boolean;
};

interface Props {
  submitRef: React.RefObject<HTMLInputElement>;
  onFormSubmitSuccess: () => void;
}

export default function Form(props: Props) {
  const { submitRef, onFormSubmitSuccess } = props;

  const [name, setName] = useState<InputStateType>({ value: '' });
  const [email, setEmail] = useState<InputStateType>({ value: '' });
  const [phone, setPhone] = useState<InputStateType>({ value: '' });
  const [address, setAddress] = useState<InputStateType>({ value: '' });
  const [zip, setZip] = useState<InputStateType>({ value: '' });
  const [city, setCity] = useState<InputStateType>({ value: '' });
  const [country, setCountry] = useState<InputStateType>({
    value: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('e-Money');
  const [eMoneyNumber, setEMoneyNumber] = useState<InputStateType>({ value: '' });
  const [eMoneyPin, setEMoneyPin] = useState<InputStateType>({ value: '' });

  const getAllInputs = () => {
    let arr: [
      InputStateType,
      React.Dispatch<React.SetStateAction<InputStateType>>,
      RegExp?
    ][] = [
      [name, setName, nameValidation],
      [email, setEmail],
      [phone, setPhone],
      [address, setAddress],
      [zip, setZip],
      [city, setCity],
      [country, setCountry],
    ];
    if (paymentMethod === 'e-Money') {
      arr.push([eMoneyNumber, setEMoneyNumber], [eMoneyPin, setEMoneyPin]);
    }
    return arr;
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value as PaymentMethodType);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isInvalid = false;
    getAllInputs().forEach(([input, setInput, validation]) => {
      const error = !input.value || (validation && !validation.test(input.value));

      if (error) {
        isInvalid = true;
      }
      setInput({ ...input, error });
    });

    if (!isInvalid) {
      onFormSubmitSuccess();
    }
  };

  const handleNumbersOnly = (
    value: string,
    set: React.Dispatch<React.SetStateAction<InputStateType>>
  ) => {
    if (value.length !== 0 && isNaN(Number(value[value.length - 1]))) return;

    set((state) => ({ ...state, value }));
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <Subtitle className={styles.subtitle}>Billing Details</Subtitle>

      <div className={styles.group}>
        <div>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <Input
            className={styles.input}
            type="text"
            id="name"
            placeholder="Alexei Ward"
            value={name.value}
            error={name.error}
            onChange={(e) => setName({ value: e.target.value })}
            validation={(value) => nameValidation.test(value)}
            onError={() => setName((state) => ({ ...state, error: true }))}
            onValid={() => setName((state) => ({ ...state, error: false }))}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="email">
            Email Address
          </label>
          <Input
            className={styles.input}
            type="email"
            id="email"
            placeholder="alexei@mail.com"
            value={email.value}
            error={email.error}
            onChange={(e) => setEmail({ value: e.target.value })}
            onError={() => setEmail((state) => ({ ...state, error: true }))}
            onValid={() => setEmail((state) => ({ ...state, error: false }))}
            onInvalid={() => {
              setEmail((state) => ({ ...state, error: true }));
            }}
          />
        </div>
      </div>

      <div className={styles.single}>
        <label className={styles.label} htmlFor="phone">
          Phone Number
        </label>
        <Input
          error={phone.error}
          className={styles.input}
          type="text"
          id="phone"
          placeholder="+1 202-555-0136"
          value={phone.value}
          onChange={(e) => setPhone({ value: e.target.value })}
          onError={() => setPhone((state) => ({ ...state, error: true }))}
          onValid={() => setPhone((state) => ({ ...state, error: false }))}
        />
      </div>

      <Subtitle className={`${styles.subtitle} ${styles.subtitleShipping}`}>
        Shipping Info
      </Subtitle>

      <div>
        <label className={styles.label} htmlFor="address">
          Address
        </label>
        <Input
          error={address.error}
          type="text"
          className={styles.input}
          id="address"
          placeholder="1137 Williams Avenue"
          value={address.value}
          onChange={(e) => setAddress({ value: e.target.value })}
          onError={() => setAddress((state) => ({ ...state, error: true }))}
          onValid={() => setAddress((state) => ({ ...state, error: false }))}
        />
      </div>
      <div className={`${styles.group} ${styles.marginTop}`}>
        <div>
          <label className={styles.label} htmlFor="zip">
            ZIP Code
          </label>
          <Input
            error={zip.error}
            type="text"
            className={styles.input}
            id="zip"
            placeholder="10001"
            value={zip.value}
            onChange={(e) => handleNumbersOnly(e.target.value, setZip)}
            onError={() => setZip((state) => ({ ...state, error: true }))}
            onValid={() => setZip((state) => ({ ...state, error: false }))}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="city">
            City
          </label>
          <Input
            error={city.error}
            type="text"
            className={styles.input}
            id="city"
            placeholder="New York"
            value={city.value}
            onChange={(e) => setCity({ value: e.target.value })}
            onError={() => setCity((state) => ({ ...state, error: true }))}
            onValid={() => setCity((state) => ({ ...state, error: false }))}
          />
        </div>
      </div>
      <div className={styles.single}>
        <label className={styles.label} htmlFor="country">
          Country
        </label>
        <Input
          error={country.error}
          type="text"
          className={styles.input}
          id="country"
          placeholder="United States"
          value={country.value}
          onChange={(e) => setCountry({ value: e.target.value })}
          onError={() => setCountry((state) => ({ ...state, error: true }))}
          onValid={() => setCountry((state) => ({ ...state, error: false }))}
        />
      </div>

      <Subtitle className={`${styles.subtitle} ${styles.subtitlePayment}`}>
        Payment Details
      </Subtitle>

      <div>
        <label className={styles.label}>Payment Method</label>
        <Input
          className={`${styles.single} ${styles.radio}`}
          type="radio"
          name="payment"
          value="e-Money"
          id="emoney"
          checked={paymentMethod === 'e-Money'}
          onChange={handlePaymentMethodChange}
        />
        <Input
          className={`${styles.single} ${styles.radio}`}
          type="radio"
          name="payment"
          value="Cash on Delivery"
          id="cash"
          checked={paymentMethod === 'Cash on Delivery'}
          onChange={handlePaymentMethodChange}
        />
      </div>
      {paymentMethod === 'e-Money' ? (
        <div className={`${styles.group} ${styles.marginTop}`}>
          <div>
            <label className={styles.label} htmlFor="emoney_number">
              e-Money Number
            </label>
            <Input
              error={eMoneyNumber.error}
              className={styles.input}
              id="emoney_number"
              placeholder="238521993"
              type="text"
              value={eMoneyNumber.value}
              onChange={(e) => handleNumbersOnly(e.target.value, setEMoneyNumber)}
              onError={() => setEMoneyNumber((state) => ({ ...state, error: true }))}
              onValid={() =>
                setEMoneyNumber((state) => ({ ...state, error: false }))
              }
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="emoney_pin">
              e-Money PIN
            </label>
            <Input
              error={eMoneyPin.error}
              className={styles.input}
              id="emoney_pin"
              placeholder="6891"
              type="text"
              value={eMoneyPin.value}
              onChange={(e) => handleNumbersOnly(e.target.value, setEMoneyPin)}
              onError={() => setEMoneyPin((state) => ({ ...state, error: true }))}
              onValid={() => setEMoneyPin((state) => ({ ...state, error: false }))}
            />
          </div>
        </div>
      ) : (
        <div className={styles.cashOnDelivery}>
          <IconCashOnDelivery className={styles.cashOnDeliveryIcon} />
          <Paragraph>
            The ‘Cash on Delivery’ option enables you to pay in cash when our
            delivery courier arrives at your residence. Just make sure your address
            is correct so that your order will not be cancelled.
          </Paragraph>
        </div>
      )}
      <input type="submit" ref={submitRef} hidden />
    </form>
  );
}
