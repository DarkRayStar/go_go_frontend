import React from 'react'

export const PWDRequiesite = ({
  capsLetterCheckFlag,
  numberCheckFlag,
  specialCharacterCheckFlag,
  pwdLengthCheckFlag,
}) => {
  return (
    <div>
      <p className={capsLetterCheckFlag}> A Capital/Uppercase Letter</p>
      <p className={numberCheckFlag}> Must Contain A Number</p>
      <p className={specialCharacterCheckFlag}> Must Contain Special Character</p>
      <p className={pwdLengthCheckFlag}> Minimum 8 characters long</p>
    </div>
  )
}
