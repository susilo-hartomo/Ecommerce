const convertRupiah = (uang) => {
  const Nominal = uang.toString().split('').reverse();
  const Rupiah = [];
  for (let i = 0; i < Nominal.length; i++) {
    if (i % 3 === 0 && i !== Nominal.length && i !== 0) Rupiah.push('.');
    Rupiah.push(Nominal[i]);
  }
  return `Rp ${Rupiah.reverse().join('')},-`;
};

module.exports = convertRupiah;
