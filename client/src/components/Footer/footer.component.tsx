import React from 'react';
import { GrCompass, GrLinkedinOption, GrGithub, GrMail } from 'react-icons/gr';
import './footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <section className='contact-info'>
        <div>
          <span>Copyright &copy; 2021 Crypto Connect. All Rights Reserved.</span>
        </div>
      </section>
      <section className='contact-link'>
        <ul className='footer-social'>
          <a
            href='https://www.linkedin.com/in/natnael-haile-b146b41bb/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <GrLinkedinOption />
          </a>
          <a
            href='https://github.com/natnaelh14'
            target='_blank'
            rel='noopener noreferrer'
          >
            <GrGithub />
          </a>
          <a
            href='mailto:haile.natnael@natnaeldev.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <GrMail />
          </a>
          <a
            href='https://natnaeldev.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <GrCompass />
          </a>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;