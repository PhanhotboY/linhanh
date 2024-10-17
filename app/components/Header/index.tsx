import { useEffect, useState } from 'react';
import { NavLink, Link, Form, useLocation } from '@remix-run/react';

import style from './index.module.css';
import {
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiCloseLargeLine,
  RiMenuLine,
  RiSearchLine,
} from '@remixicon/react';

export default function Header() {
  const { pathname, search } = useLocation();
  const [isDisplaySearchBox, setIsDisplaySearchBox] = useState(false);

  useEffect(() => {
    let scrollY = window.scrollY;
    const header = document.querySelector('header');

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (scrollY < currentScrollY) {
        header?.classList.add('-translate-y-full');
      } else {
        header?.classList.remove('-translate-y-full');
      }
      scrollY = window.scrollY;
    };

    const handleSearchKey = (e: KeyboardEvent) => {
      if (!isDisplaySearchBox && e.key === '/') {
        setIsDisplaySearchBox(true);
      }

      if (isDisplaySearchBox && e.key === 'Escape') {
        setIsDisplaySearchBox(false);
      }

      if (isDisplaySearchBox && e.key === 'Enter') {
        setIsDisplaySearchBox(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    window.addEventListener('keyup', handleSearchKey);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keyup', handleSearchKey);
    };
  }, []);

  useEffect(() => {
    setIsDisplaySearchBox(false);
  }, [pathname, search]);

  const isHasSubmenu = (item: NavigationItem) => {
    return item.items && item.items.length > 0;
  };

  const toggleDropdown = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    const dropdown = target?.querySelector(`.${style['section-list']}`);

    if (dropdown) {
      const isHidden = dropdown.classList.contains('hidden');
      dropdown.classList.toggle('hidden', !isHidden);
    }
  };

  const hideSidebar = () => {
    const overlay = document.querySelector('#navbar .overlay');
    overlay?.classList.remove('opacity-100');

    document.body.classList.remove('overflow-hidden');
    const sidebar = document.querySelector('#navbar');
    setTimeout(() => {
      sidebar?.classList.add('right-full');
    }, 500);

    const navbar = document.querySelector('#navbar nav');
    navbar?.classList.add('max-lg:-translate-x-full');
  };

  const showSidebar = () => {
    const overlay = document.querySelector('#navbar .overlay');
    overlay?.classList.add('opacity-100');

    document.body.classList.add('overflow-hidden');
    const sidebar = document.querySelector('#navbar');
    sidebar?.classList.remove('right-full');

    const navbar = document.querySelector('#navbar nav');
    navbar?.classList.remove('max-lg:-translate-x-full');
  };

  return (
    <header className={`${style.header} max-lg:w-screen`}>
      <div className='container lg:grid grid-cols-12 gap-x-10 max-lg:px-5 max-lg:flex justify-between items-center'>
        <div className='col-span-2 lg:hidden'>
          <button
            className={`${style['menu-button']} color-sub1 rounded-full p-2`}
            style={{ background: 'var(--sub2-gradient)' }}
            onClick={showSidebar}
          >
            <RiMenuLine size={24}></RiMenuLine>
          </button>
        </div>

        <div
          className={`${style.logo} col-span-4 lg:col-span-2 max-lg:col-start-5`}
        >
          <Link to='/'>
            <img src='/images/logo.png' alt='Linh Anh' />
          </Link>
        </div>

        <div
          id='navbar'
          className='col-span-9 z-10 lg:block lg:-mr-8 max-lg:fixed inset-0 right-full max-lg:overflow-hidden'
        >
          <div className='overlay' onClick={hideSidebar}>
            <RiCloseLargeLine
              className='absolute top-8 right-8 text-white opacity-80'
              size={24}
            ></RiCloseLargeLine>
          </div>

          <nav className='flex flex-col bg-[--main-color] z-20 max-lg:w-2/3 max-lg:-translate-x-full h-full relative ease-linear duration-300'>
            <div className={`${style.logo} max-lg:col-start-5 p-8 lg:hidden`}>
              <Link to='/'>
                <img src='/images/logo.png' alt='Linh Anh' />
              </Link>
            </div>

            <ul className={`${style.navbar} max-lg:flex max-lg:flex-col h-fit`}>
              {navigationSections.map((section) => (
                <li
                  key={section.sectionName}
                  className={`${style.section} max-lg:px-4 max-lg:w-full max-lg: max-lg:border-t border-white/20`}
                  onMouseOver={toggleDropdown}
                  onMouseOut={toggleDropdown}
                >
                  <NavLink
                    className={`${style['section-name']} flex justify-between items-center w-full`}
                    to={section.path}
                  >
                    {section.sectionName}
                    <RiArrowDownSLine
                      className='hidden lg:block m-0 text-white/50'
                      size={18}
                    ></RiArrowDownSLine>

                    <RiArrowRightSLine
                      className='lg:hidden m-0 text-white/50'
                      size={24}
                    ></RiArrowRightSLine>
                  </NavLink>

                  <div className={`${style['section-list']} arrow hidden`}>
                    <ul
                      className={`${
                        isHasSubmenu(section.items[0]) ? '' : 'h-fit'
                      }`}
                    >
                      {section.items.map((item) => (
                        <li
                          key={item.label}
                          className={`${style['section-item']} ${
                            isHasSubmenu(item) ? 'mx-8' : ''
                          }`}
                        >
                          <NavLink
                            className={item.items ? 'font-bold mt-5' : ''}
                            to={item.path}
                          >
                            {item.label}
                          </NavLink>
                          {isHasSubmenu(item) && (
                            <ul className={`${style['section-sublist']}`}>
                              {item.items!.map((subItem) => (
                                <li
                                  key={subItem.label}
                                  className={`${style['section-item']}`}
                                >
                                  <NavLink to={subItem.path}>
                                    {subItem.label}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={`${style.section} col-span-1`}>
          <button
            className={`${style['section-name']} ${style['contact-us']} rounded-full p-2 lg:bg-none`}
            style={{ background: 'var(--sub2-gradient)' }}
            onClick={() => setIsDisplaySearchBox(true)}
          >
            <RiSearchLine className='m-0' size={24}></RiSearchLine>
          </button>

          {isDisplaySearchBox && (
            <SearchBox
              hideSearchBoxHandler={() => setIsDisplaySearchBox(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
}

const navigationSections: Array<{
  sectionName: string;
  path: string;
  items: NavigationItem[];
}> = [
  {
    sectionName: 'GIỚI THIỆU',
    path: '/gioi-thieu/',
    items: [
      { label: 'Bảng giá', path: '/bang-gia-tham-my-vien-linh-anh/' },
      { label: 'Các công nghệ nổi bật', path: '/danh-sach-cong-nghe/' },
      { label: 'Hệ thống cơ sở', path: '/danh-sach-chi-nhanh/' },
      { label: 'Đội ngũ kỹ thuật viên', path: '/doi-ngu-ky-thuat-vien/' },
      { label: 'Báo chí nói về Linh Anh', path: '/bao-chi-noi-ve-linh-anh/' },
    ],
  },
  {
    sectionName: 'PHUN XĂM THẨM MỸ',
    path: '/phun-xam-tham-my/',
    items: [
      {
        label: 'Phun xăm chân mày',
        path: '/phun-chan-may-gia-bao-nhieu/',
        items: [
          { label: 'Phun mày Shading', path: '/phun-may-shading-la-gi/' },
          {
            label: 'Phun mày vi chạm ',
            path: '/phun-may-cham-hat-gia-bao-nhieu-tien/',
          },
          { label: 'Phun mày Ombre', path: '/phun-may-ombre/' },
          {
            label: 'Phun mày tán bột',
            path: '/phun-chan-may-tan-bot-gia-bao-nhieu/',
          },
          { label: 'Phun thêu 3D', path: '/theu-chan-may-3d-gia-bao-nhieu/' },
          {
            label: 'Phun mày hiệu ứng bút chì ',
            path: '/phun-may-hieu-ung-but-chi/',
          },
        ],
      },
      {
        label: 'Phun mí',
        path: '/phun-mi/',
        items: [
          {
            label: 'Phun mí mở tròng đá đuôi',
            path: '/phun-mi-mo-trong-da-duoi/',
          },
          { label: 'Xóa xăm mí mắt', path: '/xoa-xam-mi-mat/' },
        ],
      },
      {
        label: 'Điêu khắc chân mày',
        path: '/dieu-khac-chan-may-gia-bao-nhieu-tien/',
        items: [
          {
            label: 'Điêu khắc chân mày Shading',
            path: '/dieu-khac-chan-may-ket-hop-shading/',
          },
          { label: 'Điêu khắc chân mày 3D', path: '/dieu-khac-chan-may-3d/' },
          { label: 'Điêu khắc chân mày 8D', path: '/dieu-khac-chan-may-8d/' },
          { label: 'Điêu khắc chân mày 9D', path: '/dieu-khac-chan-may-9d/' },
          {
            label: 'Điêu khắc chân mày hairstroke',
            path: '/dieu-khac-chan-may-hairstroke/',
          },
          {
            label: 'Điêu khắc chân mày nam',
            path: '/dieu-khac-chan-may-nam-gia-bao-nhieu-tien/',
          },
        ],
      },
      {
        label: 'Thẩm mỹ vùng kín',
        path: '/tham-my-vung-kin/',
        items: [
          {
            label: 'Làm hồng nhũ hoa',
            path: '/lam-hong-nhu-hoa-gia-bao-nhieu/',
          },
          { label: 'Làm hồng cô bé', path: '/lam-hong-co-be-gia-bao-nhieu/' },
        ],
      },
      {
        label: 'Phun và cấy môi',
        path: '/phun-moi-la-gi/',
        items: [
          { label: 'Phun môi Collagen', path: '/phun-moi-collagen-la-gi/' },
          { label: 'Phun môi tế bào gốc', path: '/phun-moi-te-bao-goc/' },
          { label: 'Phun môi nano', path: '/phun-moi-nano/' },
          { label: 'Phun môi xí muội', path: '/phun-moi-xi-muoi/' },
          { label: 'Khử thâm môi', path: '/khu-tham-moi-gia-bao-nhieu/' },
          { label: 'Xóa xăm môi', path: '/xoa-xam-moi/' },
        ],
      },
    ],
  },
  {
    sectionName: 'THẨM MỸ CÔNG NGHỆ CAO',
    path: '/tham-my-cong-nghe-cao/',
    items: [
      {
        label: 'Điều trị da',
        path: '/dieu-tri-da/',
        items: [
          { label: 'Điều trị mụn', path: '/dieu-tri-mun/' },
          { label: 'Điều trị nám', path: '/dieu-tri-nam/' },
          {
            label: 'Điều trị tàn nhang',
            path: '/cach-tri-tan-nhang-hieu-qua/',
          },
          { label: 'Điều trị sẹo', path: '/dieu-tri-seo/' },
          { label: 'Điều trị thâm', path: '/dieu-tri-tham/' },
          {
            label: 'Điều trị da chuyên sâu',
            path: '/cham-soc-da-o-spa-gia-bao-nhieu/',
          },
        ],
      },
      {
        label: 'Tắm trắng',
        path: '/tam-trang/',
        items: [
          { label: 'Tắm trắng toàn thân', path: '/tam-trang-bao-nhieu-tien/' },
        ],
      },
      {
        label: 'Giảm mỡ toàn thân',
        path: '/giam-mo-toan-than/',
        items: [
          { label: 'Giảm mỡ bụng', path: '/giam-mo-bung/' },
          { label: 'Giảm mỡ bắp tay', path: '/giam-mo-bap-tay/' },
          { label: 'Giảm mỡ lưng', path: '/giam-mo-lung/' },
          { label: 'Giảm mỡ bụng dưới', path: '/giam-mo-bung-duoi/' },
          { label: 'Giảm mỡ đùi', path: '/giam-mo-dui/' },
          { label: 'Giảm mỡ mặt', path: '/giam-mo-mat/' },
          { label: 'Cấy chỉ giảm béo', path: '/cay-chi-giam-beo/' },
        ],
      },
      {
        label: 'Trẻ hóa da',
        path: '/cong-nghe-tre-hoa-da-moi-nhat/',
        items: [
          { label: 'Nâng cơ', path: '/nang-co-mat/' },
          { label: 'Xóa nhăn', path: '/xoa-nhan-vung-mat-gia-bao-nhieu/' },
          { label: 'Căng bóng da', path: '/cay-cang-bong-da/' },
          { label: 'Tạo hình khuôn mặt', path: '/tiem-filler/' },
        ],
      },
      {
        label: 'Triệt lông',
        path: '/triet-long/',
        items: [
          {
            label: 'Triệt lông toàn thân',
            path: '/triet-long-vinh-vien-gia-bao-nhieu/',
          },
          { label: 'Triệt lông bikini', path: '/co-nen-triet-long-bikini/' },
          { label: 'Triệt lông nách', path: '/triet-long-nach-gia-bao-nhieu/' },
          {
            label: 'Triệt lông mặt',
            path: '/triet-long-mat-vinh-vien-co-tot-khong/',
          },
          { label: 'Triệt lông chân', path: '/triet-long-chan-vinh-vien/' },
          { label: 'Triệt ria mép', path: '/triet-ria-mep/' },
          { label: 'Triệt lông tay', path: '/cach-triet-long-tay/' },
          { label: 'Triệt râu quai nón', path: '/triet-rau-quai-non/' },
          { label: 'Triệt lông bụng', path: '/triet-long-bung/' },
          { label: 'Triệt lông mày', path: '/triet-long-may/' },
        ],
      },
    ],
  },
  {
    sectionName: 'PHẪU THUẬT THẨM MỸ',
    path: '/phau-thuat-tham-my/',
    items: [
      {
        label: 'Thẩm mỹ má',
        path: '/tham-my-ma/',
        items: [
          { label: 'Tạo má lúm đồng tiền', path: '/tao-ma-lum-dong-tien/' },
          { label: 'Nâng gò má', path: '/nang-go-ma/' },
          { label: 'Hạ gò má', path: '/ha-go-ma-gia-bao-nhieu/' },
          { label: 'Cấy mỡ má hóp', path: '/cay-mo-ma-hop/' },
        ],
      },
      {
        label: 'Thẩm mỹ cằm & hàm',
        path: '/tham-my-cam-va-ham/',
        items: [
          { label: 'Gọt hàm Vline', path: '/got-ham-gia-bao-nhieu-tien/' },
          { label: 'Độn cằm', path: '/don-cam-gia-bao-nhieu/' },
          { label: 'Trượt cằm', path: '/truot-cam/' },
          { label: 'Gọt cằm', path: '/got-cam/' },
        ],
      },
      {
        label: 'Thẩm mỹ mũi',
        path: '/tham-my-mui/',
        items: [
          { label: 'Nâng mũi Hàn Quốc', path: '/nang-mui-han-quoc/' },
          { label: 'Nâng mũi sụn tự thân', path: '/nang-mui-sun-tu-than/' },
          {
            label: 'Nâng mũi sụn nhân tạo',
            path: '/nang-mui-bang-sun-nhan-tao/',
          },
          { label: 'Nâng mũi S-Line', path: '/nang-mui-s-line/' },
          { label: 'Nâng mũi L-Line', path: '/nang-mui-l-line/' },
          { label: 'Nâng mũi bán cấu trúc', path: '/nang-mui-ban-cau-truc/' },
          { label: 'Nâng mũi cấu trúc', path: '/nang-mui-cau-truc/' },
          { label: 'Cuộn cánh mũi', path: '/cuon-canh-mui/' },
          { label: 'Cắt cánh mũi', path: '/cat-canh-mui/' },
          { label: 'Mài gồ mũi', path: '/chi-phi-sua-mui-go/' },
          { label: 'Thu nhỏ đầu mũi', path: '/thu-nho-dau-mui/' },
          { label: 'Thu gọn cánh mũi', path: '/thu-gon-canh-mui/' },
        ],
      },
      {
        label: 'Thẩm mỹ môi',
        path: '/tham-my-moi/',
        items: [
          { label: 'Thu mỏng môi', path: '/cat-moi/' },
          { label: 'Tạo hình môi', path: '/co-nen-cat-moi-trai-tim-khong/' },
          { label: 'Tạo khóe cười', path: '/tao-khoe-mieng-cuoi/' },
        ],
      },
      {
        label: 'Căng da',
        path: '/cang-da/',
        items: [
          { label: 'Căng da mặt', path: '/cang-da-mat/' },
          { label: 'Căng da cổ', path: '/cang-da-co/' },
          { label: 'Căng da trán', path: '/cang-da-tran/' },
          { label: 'Căng da thái dương', path: '/cang-da-thai-duong/' },
          { label: 'Căng da toàn mặt', path: '/cang-da-mat-toan-phan/' },
        ],
      },
      {
        label: 'Thẩm mỹ mắt',
        path: '/tham-my-mat/',
        items: [
          { label: 'Mở góc mắt', path: '/mo-goc-mat-gia-bao-nhieu/' },
          { label: 'Nâng cung chân mày', path: '/nang-cung-chan-may-la-gi/' },
          { label: 'Cắt mí trên & dưới', path: '/cat-mi-bao-nhieu-tien/' },
          { label: 'Nhấn mí', path: '/nhan-mi-bao-nhieu-tien/' },
        ],
      },
      {
        label: 'Thẩm mỹ trán & thái dương',
        path: '/tham-my-tran-va-thai-duong/',
        items: [
          { label: 'Độn trán', path: '/don-tran/' },
          { label: 'Độn thái dương', path: '/don-thai-duong-gia-bao-nhieu/' },
          { label: 'Cấy mỡ thái dương', path: '/cay-mo-thai-duong/' },
          { label: 'Cấy mỡ trán', path: '/cay-mo-tran/' },
        ],
      },
    ],
  },
  {
    sectionName: 'TIN TỨC',
    path: '/tin-tuc/',
    items: [
      { label: 'Kiến thức thẩm mỹ', path: '/kien-thuc-tham-my/' },
      { label: 'Hoạt động sự kiện', path: '/hoat-dong-su-kien/' },
      { label: 'Chương trình khuyến mãi', path: '/chuong-trinh-khuyen-mai/' },
    ],
  },
  {
    sectionName: 'KHÁCH HÀNG THỰC TẾ',
    path: '/anh-truoc-sau/',
    items: [
      { label: 'Phun xăm thẩm mỹ', path: '/anh-truoc-sau-phun-xam-tham-my/' },
      {
        label: 'Thẩm mỹ công nghệ cao',
        path: '/anh-truoc-sau-tham-my-cong-nghe-cao/',
      },
      {
        label: 'Phẫu thuật thẩm mỹ',
        path: '/anh-truoc-sau-phau-thuat-tham-my/',
      },
    ],
  },
];

interface NavigationItem {
  label: string;
  path: string;
  items?: NavigationItem[];
}

const SearchBox = ({
  hideSearchBoxHandler,
}: {
  hideSearchBoxHandler: () => void;
}) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  });

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'
      onClick={hideSearchBoxHandler}
    >
      <Form
        className='w-1/2 p-8 rounded-lg'
        action='/search'
        role='search'
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type='text'
          className='w-full bg-transparent border-b-2 outline-0 p-2 text-white placeholder:text-white text-xl'
          placeholder='Tìm kiếm'
          aria-label='Search blogs'
          name='q'
          autoFocus
        />
      </Form>
    </div>
  );
};
