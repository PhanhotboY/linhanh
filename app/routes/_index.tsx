import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import type { MetaFunction, LoaderFunctionArgs } from '@remix-run/node';
import { lazy, Suspense, useState } from 'react';
import { RiMapPin2Fill } from '@remixicon/react';
import { Image } from '@unpic/react';

import Title from '~/components/Title';
import Card from '~/components/Card';
import MasterDetail from '~/components/MasterDetail';
import RiButton from '~/components/RiButton';
import { getLabelValue } from '~/lib';

const Slider = lazy(() => import('~/components/Slider'));

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // const url = new URL(request.url);
  const branches = await fetch(request.url + 'data/branches.json').then((res) =>
    res.json()
  );
  const services = await fetch(request.url + 'data/services.json').then((res) =>
    res.json()
  );
  const promotions = await fetch(request.url + 'data/promotions.json').then(
    (res) => res.json()
  );
  const members = await fetch(request.url + 'data/members.json').then((res) =>
    res.json()
  );
  const customers = await fetch(request.url + 'data/customers.json').then(
    (res) => res.json()
  );
  const blogs = await fetch(request.url + 'data/blogs.json').then((res) =>
    res.json()
  );
  const testimonies = await fetch(request.url + 'data/testimonies.json').then(
    (res) => res.json()
  );
  const partners = await fetch(request.url + 'data/partners.json').then((res) =>
    res.json()
  );

  // console.log('url from home: ', url);

  return json({
    branches,
    services,
    promotions,
    members,
    customers,
    blogs,
    testimonies,
    partners,
  });
};

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Thẩm Mỹ Linh Anh - Thương Hiệu Làm Đẹp Uy Tín Số 1 Tại Việt Nam',
    },
    {
      name: 'description',
      content:
        'Thẩm mỹ Quốc tế Linh Anh là thương hiệu chuyên cung cấp các dịch vụ làm đẹp công nghệ cao như: điều trị da, phun xăm thẩm mỹ, giảm béo,... và các dịch vụ tạo hình thẩm mỹ khác như: nâng mũi, căng da mặt, cắt mí, nâng cung chân mày,...',
    },
  ];
};

export default function Index() {
  const {
    branches,
    services,
    promotions,
    members,
    customers,
    blogs,
    testimonies,
    partners,
  } = useLoaderData<typeof loader>();

  const [activeService, setActiveService] = useState(services[0].value);
  const [activeBranch, setActiveBranch] = useState(branches[0].value);
  const [activeMember, setActiveMember] = useState(members[0].value);
  const [activeCustomer, setActiveCustomer] = useState(customers[0].value);

  return (
    <>
      <section id='slider'>
        <Suspense
          fallback={
            <div className='h-80 font-3xl bold col-span-12'>
              Loading...............
            </div>
          }
        >
          <div id='slider-wrapper' className='grid grid-cols-12 '>
            <Slider
              wrapper={'#slider-wrapper'}
              className='hidden lg:block'
              images={[
                '/images/slides/slide-1.png',
                '/images/slides/slide-2.png',
                '/images/slides/slide-3.png',
                '/images/slides/slide-4.png',
                '/images/slides/slide-5.png',
              ]}
              // height={650}
              col={12}
            />
          </div>

          <div id='mobile-slider-wrapper' className='grid grid-cols-12'>
            <Slider
              wrapper={'#mobile-slider-wrapper'}
              className='block lg:hidden'
              images={[
                '/images/slides/mobile/slide-1.png',
                '/images/slides/mobile/slide-2.png',
                '/images/slides/mobile/slide-3.png',
                '/images/slides/mobile/slide-4.png',
              ]}
              // height={}
              col={12}
            />
          </div>
        </Suspense>
      </section>

      <section id='services'>
        <div className='container'>
          <Title
            tabs={getLabelValue(services)}
            activeTab={activeService}
            changeTabHandler={(tab) => setActiveService(tab)}
          >
            CÁC DỊCH VỤ HOT
          </Title>

          <PhunXamCards services={services} value={activeService} />
        </div>
      </section>

      <section
        id='promotion'
        className='bg-wave bg-cover bg-top max-lg:pt-20'
        style={{
          paddingTop: 'calc(var(--header-height) + 2rem)',
        }}
      >
        <div className='container'>
          <Title>ĐẠI TIỆC KHUYẾN MÃI</Title>

          <MasterDetail data={promotions} />
        </div>
      </section>

      <section id='branch' className='py-8'>
        <div className='container'>
          <Title
            tabs={getLabelValue(branches)}
            activeTab={activeBranch}
            changeTabHandler={(tab) => setActiveBranch(tab)}
          >
            CHI NHÁNH
          </Title>

          <BranchCards branches={branches} value={activeBranch} />
        </div>
      </section>

      <section id='facilities' className='p-8'>
        <div className='container'>
          <Title>CÔNG NGHỆ TIÊN TIẾN - CƠ SỞ VẬT CHẤT HIỆN ĐẠI</Title>

          <div className='flex items-center xl:mt-20 max-lg:flex-wrap max-md:-mx-6 lg:-ml-8'>
            {[1, 1].map((n, i) => (
              <article
                key={i}
                className='flex max-sm:flex-row-reverse rounded-xl relative h-fit max-xl:mb-8 lg:ml-8'
                style={{ boxShadow: '1px 2px 10px 2px var(--shadow-color)' }}
              >
                <div className='flex flex-col w-1/2 xl:w-3/5 py-5 px-5 xl:px-8'>
                  <h3 className='m-0'>CÔNG NGHỆ THẨM MỸ</h3>

                  <p className='mt-2 mb-4 color-sub3 flex-grow'>
                    Áp dụng công nghệ tiên tiến bậc nhất được chuyển giao từ các
                    tập đoàn công nghệ thẩm mỹ hàng đầu thế giới.
                  </p>

                  <RiButton
                    className='w-2/3 max-md:w-max lg:max-xl:w-full max-sm:-ml-24 uppercase'
                    href='/'
                  >
                    Tìm hiểu thêm
                  </RiButton>
                </div>

                <Image
                  className='h-fit max-md:mt-8 xl:absolute w-1/2 xl:w-2/5 right-0 xl:-top-1/3'
                  src='/images/cong-nghe-tham-my.png'
                  alt=''
                  layout='fullWidth'
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id='members' className='bg-sub1'>
        <div className='container py-14'>
          <Title
            tabs={getLabelValue(members)}
            activeTab={activeMember}
            changeTabHandler={(tab) => setActiveMember(tab)}
          >
            ĐỘI NGŨ BÁC SĨ - KỸ THUẬT VIÊN
          </Title>

          <MemberCards members={members} value={activeMember} />
        </div>
      </section>

      <section id='kol' className='py-8'>
        <div className='container'>
          <Title>SAO VIỆT ĐỒNG HÀNH CÙNG LINH ANH</Title>

          <div className='wrapper grid-cols-12 relative'>
            <div
              className='bg absolute inset-0 z-[-1]'
              style={{
                background:
                  'url("/images/overlay.png") center center / cover no-repeat',
              }}
            ></div>

            <div className='flex flex-col items-center col-span-12 md:col-span-6 lg:pr-16'>
              <Image
                className='w-2/3'
                src='/images/huong-giang.png'
                alt=''
                layout='fullWidth'
              />

              <p className='color-main text-lg p-4 text-justify flex-grow'>
                Hoa hậu Hương Giang - Biểu tượng của vẻ đẹp hiện đại và sự thông
                thái - chính thức trở thành Đại sứ thương hiệu của Thẩm mỹ Quốc
                tế Linh Anh, nối tiếp hành trình khai phóng nhan sắc.
              </p>

              <RiButton className='w-fit px-8 max-md:my-4 mx-auto' href='/'>
                Đọc thêm
              </RiButton>
            </div>

            <div className='col-span-12 md:col-span-6 max-md:flex max-md:flex-col-reverse max-lg:px-4'>
              <Image src='/images/girls.png' layout='fullWidth'></Image>

              <iframe
                className='w-full rounded-xl aspect-video m-auto mt-4 max-md:mb-4'
                src='https://www.youtube.com/embed/MwpMEbgC7DA?si=WPnLLnOuIbFyuEwr'
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section id='customer' className='py-8'>
        <div className='container'>
          <Title
            tabs={getLabelValue(customers)}
            activeTab={activeCustomer}
            changeTabHandler={(tab) => setActiveCustomer(tab)}
          >
            HÌNH ẢNH THỰC TẾ CỦA KHÁCH HÀNG
          </Title>

          <CustomerCards customers={customers} value={activeCustomer} />

          <RiButton className='w-fit m-auto mt-10 px-8 uppercase' href='/'>
            Xem thêm
          </RiButton>
        </div>
      </section>

      <section id='blog'>
        <div className='container'>
          <Title>KIẾN THỨC THẨM MỸ</Title>

          <Blogs blogs={blogs} />

          <RiButton className='w-fit m-auto mt-10 px-8 uppercase' href='/'>
            Xem thêm
          </RiButton>
        </div>
      </section>

      <aside
        style={{
          background:
            'url("/images/bg-gradient.png") center center / cover no-repeat',
        }}
      >
        <section id='testimony' className='py-8'>
          <div className='container'>
            <div>
              <Title>BÁO CHÍ NÓI VỀ LINH ANH</Title>
            </div>

            <div className='grid grid-cols-12 max-lg:flex flex-col max-lg:px-4'>
              <div className='col-span-5 flex items-center max-lg:mb-4 lg:pr-8 text-justify'>
                <p className='text-black text-lg'>
                  Linh Anh tự hào là hệ thống thẩm mỹ hàng đầu được nhiều tờ báo
                  uy tín nhắc đến như một sự công nhận về vị thế và tầm quan
                  trọng của Linh Anh trong lĩnh vực thẩm mỹ.
                </p>
              </div>

              <div className='col-span-7 grid grid-cols-12'>
                {testimonies.map((t: any, i: number) => (
                  <Image
                    src={t.image}
                    className={`${
                      i < 3 ? 'md:-ml-4' : i >= 6 ? 'md:ml-4' : ''
                    } col-span-6 md:col-span-4 ${
                      i === testimonies.length - 1 ? 'max-md:col-start-4' : ''
                    }`}
                    layout='fullWidth'
                    key={i}
                  ></Image>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id='partner' className='py-8'>
          <div className='container'>
            <h2 className='text-center text-2xl md:text-3xl color-main font-bold mb-8'>
              ĐỐI TÁC CỦA LINH ANH
            </h2>

            <div className='wrapper grid-cols-12 gap-8 grid-rows-2 px-4 md:px-16 gap-10'>
              {partners.map((p: any, i: number) => (
                <Image
                  className='col-span-6 md:col-span-4'
                  src={p.logo}
                  layout='fullWidth'
                  key={i}
                  title={p.name}
                  alt={`Đối tác ${p.name}`}
                ></Image>
              ))}
            </div>
          </div>
        </section>
      </aside>
    </>
  );
}

const PhunXamCards = ({
  services,
  value,
}: {
  services: Array<{
    label: string;
    description: string;
    image: string;
    value: string;
  }>;
  value: string;
}) => {
  return (
    <div className='wrapper max-lg:overflow-x-scroll max-lg:w-screen max-lg:-mt-8'>
      <div className='lg:grid grid-cols-12 gap-x-5 lg:gap-x-8 gap-y-8 flex flex-nowrap max-lg:p-8'>
        {services.map((s, i) =>
          s.value === value ? (
            <Card
              key={i}
              className='col-span-2 lg:col-span-4'
              title={s.label}
              button='Tìm hiểu thêm'
              image={s.image}
            >
              <p>{s.description}</p>
            </Card>
          ) : null
        )}
      </div>
    </div>
  );
};

const BranchCards = ({
  branches,
  value,
}: {
  branches: Array<{
    province: string;
    value: string;
    addresses: Array<{
      address: string;
      district: string;
      map: string;
      image: string;
      isHighlight: boolean;
    }>;
  }>;
  value: string;
}) => {
  return (
    <div className='wrapper max-lg:overflow-x-scroll max-lg:w-screen max-lg:-mt-8'>
      <div className='lg:grid grid-cols-10 gap-x-5 lg:gap-x-2 flex flex-nowrap max-lg:p-8'>
        {branches
          .find((b) => b.value === value)
          ?.addresses.map((a, i) => (
            <Card
              key={i}
              className='col-span-2'
              image={a.image}
              isHighlight={a.isHighlight}
            >
              <p
                className='text-base mt-4 font-bold'
                style={{ color: 'var(--main-color)' }}
              >
                {a.address}
              </p>

              <p className='text-sm my-2'>{a.district}</p>

              <a
                className='text-xs font-bold underline flex justify-center'
                href={a.map}
                style={{ color: 'var(--main-color)' }}
                target='_blank'
              >
                <RiMapPin2Fill className='mr-1' size={12} />
                Nhấn xem chỉ đường
              </a>

              <RiButton className='w-full text-sm p-2 mt-4 uppercase' href='/'>
                Đặt lịch hẹn
              </RiButton>
            </Card>
          ))}
      </div>
    </div>
  );
};

const MemberCards = ({
  members,
  value,
}: {
  members: Array<{
    name: string;
    title: string;
    image: string;
    value: string;
  }>;
  value: string;
}) => {
  return (
    <div className='w-full max-lg:overflow-x-scroll'>
      <div className='grid grid-cols-12 gap-5 max-lg:w-max max-lg:p-8'>
        {members.map((m, i) =>
          m.value === value ? (
            <Card key={i} className='col-span-3 p-4' image={m.image}>
              <h3 className='mt-4 uppercase font-bold'>{m.name}</h3>

              <h4 className='text-base font-bold color-main my-2'>{m.title}</h4>

              <p className='rounded-xl p-2.5 mt-4 bg-sub1 text-black'>
                Được đào tạo chuyên nghiệp trong lĩnh vực Chăm sóc da
              </p>
              <p className='rounded-xl p-2.5 mt-4 bg-sub1 text-black'>
                Hơn 4 năm kinh nghiệm Chăm sóc da thẩm mỹ tại bệnh viện Da liễu
              </p>
            </Card>
          ) : null
        )}
      </div>
    </div>
  );
};

const CustomerCards = ({
  customers,
  value,
}: {
  customers: Array<{
    name: string;
    age: string;
    image: string;
    value: string;
    description: string;
  }>;
  value: string;
}) => {
  return (
    <div className='w-full max-lg:overflow-x-scroll'>
      <div className='flex flex-nowrap max-lg:w-max lg:grid grid-cols-12 gap-x-8 gap-y-10'>
        {customers.map((customer, i) =>
          customer.value === value ? (
            <Card
              className='col-span-4 p-0 bg-main shadow-none'
              image={customer.image}
              key={i}
              title={`${customer.name} (${customer.age} tuổi)`}
            >
              <p className='text-black text-lg px-16'>{customer.description}</p>
            </Card>
          ) : null
        )}
      </div>
    </div>
  );
};

const Blogs = ({ blogs }: { blogs: Array<any> }) => {
  const mainBlog = blogs.find((b) => b.isMain);
  return (
    <div className='grid grid-cols-12 gap-5 max-lg:px-4'>
      <article className='col-span-12 lg:col-span-6 row-span-3 flex flex-col'>
        <Link to='/'>
          <Image
            className='rounded-xl'
            src={mainBlog.image}
            layout='fullWidth'
            alt={mainBlog.title}
          ></Image>

          <h3 className={'text-center'}>{mainBlog.title}</h3>

          <div className='divider'></div>

          <p
            className={'text-justify'}
            style={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}
          >
            {mainBlog.preview}
          </p>
        </Link>
      </article>

      {blogs.map((b, i) =>
        !b.isMain ? (
          <article key={i} className='col-span-12 lg:col-span-6 max-lg:mt-4'>
            <Link
              className='block grid grid-cols-2 h-fit max-sm:flex flex-col'
              to='/'
            >
              <Image
                className='rounded-xl col-span-1'
                src={b.image}
                layout='fullWidth'
                alt={b.title}
              ></Image>

              <div className='col-span-1 ml-5 max-md:flex flex-col'>
                <h3
                  className='m-0 text-lg max-md:mt-4'
                  style={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                  }}
                >
                  {b.title}
                </h3>

                <div className='divider'></div>

                <p
                  className={'text-ellipsis'}
                  style={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    wordWrap: 'break-word',
                  }}
                >
                  {b.preview}
                </p>
              </div>
            </Link>
          </article>
        ) : null
      )}
    </div>
  );
};
