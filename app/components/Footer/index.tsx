import { Image } from '@unpic/react';

import style from './index.module.css';
import {
  RiFacebookFill,
  RiLinkedinFill,
  RiTiktokFill,
  RiYoutubeFill,
} from '@remixicon/react';
import { Link } from '@remix-run/react';

export default function Footer() {
  return (
    <footer id={`${style.footer}`} className='bg-sub2 max-lg:w-screen'>
      <div className='container py-10 max-md:px-4'>
        <div className='flex flex-col max-md:items-center md:grid grid-cols-12 gap-7'>
          <aside className='col-span-3'>
            <Link to='/'>
              <Image
                className='m-auto px-16'
                src='/images/logo.png'
                layout='fullWidth'
                alt='Logo'
              ></Image>
            </Link>

            <p className='text-justify my-4'>
              Với sứ mệnh lan tỏa vẻ đẹp Việt, Linh Anh luôn không ngừng hoàn
              thiện và cải tiến từng ngày để mang đến cho khách hàng những trải
              nghiệm dịch vụ tuyệt vời nhất. Thẩm mỹ quốc tế Linh Anh: Lắng nghe
              từ tâm - Trải nghiệm xứng tầm
            </p>

            <a href='http://' target='_blank' rel='noopener noreferrer'>
              <img
                className='m-auto'
                src='/images/dmca-protected.png'
                alt='DMCA Protected'
              />
            </a>
          </aside>

          <section id={style.contact} className='col-span-3'>
            <h3>THÔNG TIN LIÊN HỆ</h3>

            <ul>
              <li className='block max-md:text-center'>
                <span className='block'>Địa chỉ:</span>
                <b>
                  <a href='http://' target='_blank' rel='noopener noreferrer'>
                    398 - 400A Đ. Lê Hồng Phong, P.1, Q.10, TP.HCM
                  </a>
                </b>
              </li>
              <li>
                <span>Hotline:</span>
                <b>
                  <a href='tel:0906 933 888'>0906 933 888</a>
                </b>
              </li>
              <li>
                <span>Email:</span>
                <b>
                  <a href='mailto:thanhhistory203@gmail.com'>
                    thanhhistory203@gmail.com
                  </a>
                </b>
              </li>
              <li>
                <span>
                  Thời gian làm việc: <b>8h30 - 19h30 hằng ngày</b>
                </span>
              </li>
            </ul>

            <section id={style.social_media} className='mt-5'>
              <h4 className='max-md:text-center'>Theo dõi chúng tôi tại:</h4>

              <ul className='flex max-md:justify-center'>
                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    <RiFacebookFill />
                  </a>
                </li>

                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    <RiTiktokFill />
                  </a>
                </li>

                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    <RiYoutubeFill />
                  </a>
                </li>

                <li>
                  <a href='/' target='_blank' rel='noopener noreferrer'>
                    <RiLinkedinFill />
                  </a>
                </li>
              </ul>
            </section>
          </section>

          <section className='col-span-3'>
            <h3>CHÍNH SÁCH CHUNG</h3>

            <ul>
              <li>
                <Link to=''>Chính sách và quy định chung</Link>
              </li>
              <li>
                <Link to=''>Chính sách bảo mật và thông tin</Link>
              </li>
              <li>
                <Link to=''>Hệ thống chi nhánh</Link>
              </li>
              <li>
                <Link to=''>Tuyển dụng</Link>
              </li>
              <li>
                <Link to=''>Nhận tư vấn miễn phí</Link>
              </li>
              <li>
                <Link to=''>Tiếp nhận ý kiến phản ánh</Link>
              </li>
            </ul>
          </section>

          <section className='col-span-3'>
            <h3>DỊCH VỤ NỔI BẬT</h3>

            <ul>
              <li>
                <Link to=''>Phun xăm chân mày</Link>
              </li>
              <li>
                <Link to=''>Điêu khắc chân mày</Link>
              </li>
              <li>
                <Link to=''>Phun và cấy môi</Link>
              </li>
              <li>
                <Link to=''>JUV - Beauty</Link>
              </li>
              <li>
                <Link to=''>Tắm trắng</Link>
              </li>
              <li>
                <Link to=''>Triệt lông</Link>
              </li>
            </ul>
          </section>
        </div>

        <div className='mt-16 text-sm flex flex-col items-center'>
          <p className='max-md:flex flex-col'>
            <span className='text-center'>
              2016 - 2024 CÔNG TY TNHH THẨM MỸ LINH ANH SAIGON - LINH ANH SAIGON
              AESTHETIC COMPANY LIMITED
            </span>
            <span className='text-center max-md:mt-2'>
              Số ĐKKD: 0317 532 839 Do sở KHĐT TP.HCM cấp ngày 22/10/2022
            </span>
          </p>

          <section
            id={style['contact-information']}
            className='flex mt-2 max-md:flex-col items-center'
          >
            <p>
              <span>Địa chỉ:</span>
              <span>
                66/68 Lê Văn Duyệt, Phường 1, Quận Bình Thạnh, TP. Hồ Chí Minh
              </span>
            </p>
            <p>
              <span>Số điện thoại:</span>
              <span>0903032560</span>
            </p>
            <p>
              <span>Email:</span>
              <span>vienthammylinhanh@gmail.com</span>
            </p>
            <p>
              <span>Người quản lý nội dung:</span>
              <span>Nguyễn Bá Quang</span>
            </p>
          </section>
        </div>
      </div>
    </footer>
  );
}
