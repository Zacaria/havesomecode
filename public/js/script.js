const tld_ =  'com', topDom_ = 13, m_ = 'mailto:', a_ = '@', d_ = '.';
function e_() { return ' havesomecode'+a_+'gmail'+d_+tld_; }
const iconMail = document.createElement('i');
iconMail.classList.add('fa');
iconMail.classList.add('fa-envelope-o');
iconMail.classList.add('fa-fw');
const linkMail = document.createElement('a');
linkMail.setAttribute('title', 'Email');
linkMail.setAttribute('href', m_+e_());
linkMail.appendChild(iconMail);
const m = document.createTextNode(e_());
linkMail.appendChild(m);
document.getElementsByClassName('email')[0].appendChild(linkMail);

const tNumbers = ['06', '17', '07', '71', '65'];
const tPhone = () => tNumbers.map(String).join('.');
const iconNb = document.createElement('i');
iconNb.classList.add('fa');
iconNb.classList.add('fa-phone');
iconNb.classList.add('fa-fw');
const linkNb = document.createElement('a');
linkNb.setAttribute('title', 'Email');
linkNb.setAttribute('href', 'tel:'+tPhone());
linkNb.appendChild(iconNb);
const nbText = document.createTextNode(' '+tPhone());
linkNb.appendChild(nbText);
document.getElementsByClassName('phone')[0].appendChild(linkNb);


