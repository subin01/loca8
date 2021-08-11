// @ts-nocheck
import { ErrorMessage } from '@hookform/error-message'
import { Controller } from 'react-hook-form'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

interface IProps {
  defaultValue: string
  name: string
  errors?: {}
  control?: {}
}

export default function Phone({ defaultValue = '', name = 'phone', errors, control }: IProps) {
  return (
    <fieldset className="phone">
      <label htmlFor={name}>
        Phone:<span>(Choose the country first)</span>
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: { value: true, message: 'Phone is required' },
          validate: (value) => {
            return isValidPhoneNumber(value) || 'Invalid Phone'
          },
        }}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            international={true}
            addInternationalOption={false}
            countryCallingCodeEditable={false}
            defaultCountry="IN"
            countries={['IN', 'GB', 'US', 'CA', 'AU', 'NZ']}
            flagUrl={'/images/flags/{XX}.svg'}
            placeholder="Enter phone number"
            value={value}
            onChange={onChange}
          />
        )}
      />
      <span className="inline-error">
        <ErrorMessage errors={errors} name={name} />
      </span>
    </fieldset>
  )
}
