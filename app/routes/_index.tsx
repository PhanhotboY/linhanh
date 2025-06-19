import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { lazy, Suspense, useState } from "react";
import { RiMapPin2Fill } from "@remixicon/react";
import { Image } from "@unpic/react";
import { motion } from "framer-motion";
import * as fs from "fs/promises";
import * as path from "path";

import Title from "~/components/Title";
import Card from "~/components/Card";
import MasterDetail from "~/components/MasterDetail";
import RiButton from "~/components/RiButton";
import { getLabelValue } from "~/lib";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  slideInFromBottom,
} from "~/lib/animations";

const Slider = lazy(() => import("~/components/Slider"));

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let branches,
    services,
    promotions,
    members,
    customers,
    blogs,
    testimonies,
    partners;

  try {
    const dataPath = path.join(process.cwd(), "public", "data");

    const [
      branchesData,
      servicesData,
      promotionsData,
      membersData,
      customersData,
      blogsData,
      testimoniesData,
      partnersData,
    ] = await Promise.all([
      fs.readFile(path.join(dataPath, "branches.json"), "utf-8"),
      fs.readFile(path.join(dataPath, "services.json"), "utf-8"),
      fs.readFile(path.join(dataPath, "promotions.json"), "utf-8"),
      fs.readFile(path.join(dataPath, "members.json"), "utf-8"),
      fs.readFile(path.join(dataPath, "customers.json"), "utf-8"),
      fs.readFile(path.join(dataPath, "blogs.json"), "utf-8"),
      fs.readFile(path.join(dataPath, "testimonies.json"), "utf-8"),
      fs.readFile(path.join(dataPath, "partners.json"), "utf-8"),
    ]);

    branches = JSON.parse(branchesData);
    services = JSON.parse(servicesData);
    promotions = JSON.parse(promotionsData);
    members = JSON.parse(membersData);
    customers = JSON.parse(customersData);
    blogs = JSON.parse(blogsData);
    testimonies = JSON.parse(testimoniesData);
    partners = JSON.parse(partnersData);
  } catch (error) {
    console.error("Error loading data files:", error);
    // Return empty arrays as fallback
    branches = [];
    services = [];
    promotions = [];
    members = [];
    customers = [];
    blogs = [];
    testimonies = [];
    partners = [];
  }

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
      title:
        "CareerHub - Kết nối với Công việc Mơ ước | Nền tảng Việc làm Chuyên nghiệp",
    },
    {
      name: "description",
      content:
        "CareerHub là nền tảng việc làm chuyên nghiệp hàng đầu kết nối các chuyên gia tài năng với các công ty hàng đầu trên toàn thế giới. Khám phá cơ hội trong công nghệ, y tế, tài chính và nhiều hơn nữa. Xây dựng sự nghiệp của bạn với hướng dẫn chuyên gia và ghép đôi công việc được cá nhân hóa.",
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

  const [activeService, setActiveService] = useState(services[0]?.value || "");
  const [activeBranch, setActiveBranch] = useState(branches[0]?.value || "");
  const [activeMember, setActiveMember] = useState(members[0]?.value || "");
  const [activeCustomer, setActiveCustomer] = useState(
    customers[0]?.value || ""
  );

  return (
    <>
      <section id="slider">
        <Suspense
          fallback={
            <div className="h-80 font-3xl bold col-span-12">
              Loading...............
            </div>
          }
        >
          <div id="slider-wrapper" className="grid grid-cols-12 ">
            <Slider
              wrapper={"#slider-wrapper"}
              className="hidden lg:block"
              images={[
                "/images/slides/slide-1.png",
                "/images/slides/slide-2.png",
                "/images/slides/slide-3.png",
                "/images/slides/slide-4.png",
                "/images/slides/slide-5.png",
              ]}
              // height={650}
              col={12}
            />
          </div>

          <div id="mobile-slider-wrapper" className="grid grid-cols-12">
            <Slider
              wrapper={"#mobile-slider-wrapper"}
              className="block lg:hidden"
              images={[
                "/images/slides/mobile/slide-1.png",
                "/images/slides/mobile/slide-2.png",
                "/images/slides/mobile/slide-3.png",
                "/images/slides/mobile/slide-4.png",
              ]}
              // height={}
              col={12}
            />
          </div>
        </Suspense>
      </section>

      <motion.section
        id="services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container">
          <Title
            tabs={getLabelValue(services)}
            activeTab={activeService}
            changeTabHandler={(tab) => setActiveService(tab)}
          >
            KHÁM PHÁ CƠ HỘI NGHỀ NGHIỆP
          </Title>

          <motion.div variants={staggerItem}>
            <PhunXamCards services={services} value={activeService} />
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="promotion"
        className="bg-wave bg-cover bg-top max-lg:pt-20"
        style={{
          paddingTop: "calc(var(--header-height) + 2rem)",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="container">
          <Title>CHƯƠNG TRÌNH THĂNG TIẾN NGHỀ NGHIỆP</Title>

          <motion.div variants={slideInFromBottom}>
            <MasterDetail data={promotions} />
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="branch"
        className="py-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInLeft}
      >
        <div className="container">
          <Title
            tabs={getLabelValue(branches)}
            activeTab={activeBranch}
            changeTabHandler={(tab) => setActiveBranch(tab)}
          >
            CƠ HỘI TOÀN CẦU
          </Title>

          <motion.div variants={slideInFromBottom}>
            <BranchCards branches={branches} value={activeBranch} />
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="culture"
        className="p-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="container">
          <Title>NƠI LÀM VIỆC TIÊN TIẾN - VĂN HÓA CÔNG TY HIỆN ĐẠI</Title>

          <motion.div
            className="flex items-center xl:mt-20 max-lg:flex-wrap max-md:-mx-6 lg:-ml-8"
            variants={staggerContainer}
          >
            {[
              {
                title: "GHÉP ĐÔI BẰNG AI",
                description:
                  "Công nghệ AI tiên tiến của chúng tôi ghép đôi bạn với các cơ hội phù hợp hoàn hảo với kỹ năng, kinh nghiệm và khát vọng nghề nghiệp của bạn.",
                image: "/images/ai-technology.png",
              },
              {
                title: "VĂN HÓA LÀM VIỆC LINH HOẠT",
                description:
                  "Đón nhận tương lai của công việc với các cơ hội remote-first, lịch trình linh hoạt và cân bằng cuộc sống công việc phù hợp với lối sống của bạn.",
                image: "/images/flexible-work.png",
              },
            ].map((item, i) => (
              <motion.article
                key={i}
                className="flex max-sm:flex-row-reverse rounded-xl relative h-fit max-xl:mb-8 lg:ml-8"
                style={{ boxShadow: "1px 2px 10px 2px var(--shadow-color)" }}
                variants={staggerItem}
              >
                <div className="flex flex-col w-1/2 xl:w-3/5 py-5 px-5 xl:px-8">
                  <h3 className="m-0">{item.title}</h3>

                  <p className="mt-2 mb-4 color-sub3 flex-grow">
                    {item.description}
                  </p>

                  <RiButton
                    className="w-2/3 max-md:w-max lg:max-xl:w-full max-sm:-ml-24 uppercase"
                    href="/"
                  >
                    Tìm hiểu thêm
                  </RiButton>
                </div>

                <Image
                  className="h-fit max-md:mt-8 xl:absolute w-1/2 xl:w-2/5 right-0 xl:-top-1/3"
                  src={item.image}
                  alt={item.title}
                  layout="fullWidth"
                />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <section id="members" className="bg-sub1">
        <div className="container py-14">
          <Title
            tabs={getLabelValue(members)}
            activeTab={activeMember}
            changeTabHandler={(tab) => setActiveMember(tab)}
          >
            EXPERT CAREER CONSULTANTS
          </Title>

          <MemberCards members={members} value={activeMember} />
        </div>
      </section>

      <motion.section
        id="featured-employers"
        className="py-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="container">
          <Title>FEATURED EMPLOYERS & INDUSTRY LEADERS</Title>

          <motion.div
            className="wrapper grid-cols-12 relative"
            variants={staggerContainer}
          >
            <div
              className="bg absolute inset-0 z-[-1]"
              style={{
                background:
                  'url("/images/overlay.png") center center / cover no-repeat',
              }}
            ></div>

            <motion.div
              className="flex flex-col items-center col-span-12 md:col-span-6 lg:pr-16"
              variants={fadeInLeft}
            >
              <Image
                className="w-2/3"
                src="/images/ceo-featured.png"
                alt="Featured CEO"
                layout="fullWidth"
              />

              <p className="color-main text-lg p-4 text-justify flex-grow">
                Join thousands of professionals who have launched their careers
                with top industry leaders. Our platform connects you directly
                with hiring managers at Fortune 500 companies, innovative
                startups, and industry pioneers who are shaping the future of
                work.
              </p>

              <RiButton className="w-fit px-8 max-md:my-4 mx-auto" href="/">
                Explore Employers
              </RiButton>
            </motion.div>

            <motion.div
              className="col-span-12 md:col-span-6 max-md:flex max-md:flex-col-reverse max-lg:px-4"
              variants={fadeInRight}
            >
              <Image
                src="/images/team-collaboration.png"
                layout="fullWidth"
                alt="Team Collaboration"
              ></Image>

              <iframe
                className="w-full rounded-xl aspect-video m-auto mt-4 max-md:mb-4"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="CareerHub Success Stories"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <section id="customer" className="py-8">
        <div className="container">
          <Title
            tabs={getLabelValue(customers)}
            activeTab={activeCustomer}
            changeTabHandler={(tab) => setActiveCustomer(tab)}
          >
            HÌNH ẢNH THỰC TẾ CỦA KHÁCH HÀNG
          </Title>

          <CustomerCards customers={customers} value={activeCustomer} />

          <RiButton className="w-fit m-auto mt-10 px-8 uppercase" href="/">
            Xem thêm
          </RiButton>
        </div>
      </section>

      <section id="blog">
        <div className="container">
          <Title>KIẾN THỨC THẨM MỸ</Title>

          <Blogs blogs={blogs} />

          <RiButton className="w-fit m-auto mt-10 px-8 uppercase" href="/">
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
        <section id="testimony" className="py-8">
          <div className="container">
            <div>
              <Title>BÁO CHÍ NÓI VỀ LINH ANH</Title>
            </div>

            <div className="grid grid-cols-12 max-lg:flex flex-col max-lg:px-4">
              <div className="col-span-5 flex items-center max-lg:mb-4 lg:pr-8 text-justify">
                <p className="text-black text-lg">
                  Linh Anh tự hào là hệ thống thẩm mỹ hàng đầu được nhiều tờ báo
                  uy tín nhắc đến như một sự công nhận về vị thế và tầm quan
                  trọng của Linh Anh trong lĩnh vực thẩm mỹ.
                </p>
              </div>

              <div className="col-span-7 grid grid-cols-12">
                {testimonies.map((t: any, i: number) => (
                  <Image
                    src={t.image}
                    className={`${
                      i < 3 ? "md:-ml-4" : i >= 6 ? "md:ml-4" : ""
                    } col-span-6 md:col-span-4 ${
                      i === testimonies.length - 1 ? "max-md:col-start-4" : ""
                    }`}
                    layout="fullWidth"
                    key={i}
                  ></Image>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="partner" className="py-8">
          <div className="container">
            <h2 className="text-center text-2xl md:text-3xl color-main font-bold mb-8">
              ĐỐI TÁC CỦA LINH ANH
            </h2>

            <div className="wrapper grid-cols-12 gap-8 grid-rows-2 px-4 md:px-16 gap-10">
              {partners.map((p: any, i: number) => (
                <Image
                  className="col-span-6 md:col-span-4"
                  src={p.logo}
                  layout="fullWidth"
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
    <div className="wrapper max-lg:overflow-x-scroll w-full max-lg:-mt-8">
      <motion.div
        className="lg:grid grid-cols-12 gap-x-5 lg:gap-x-8 gap-y-8 flex flex-nowrap max-lg:p-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {services.map((s, i) =>
          s.value === value ? (
            <motion.div
              key={`${s.value}-${i}`}
              variants={staggerItem}
              className="col-span-2 lg:col-span-4"
            >
              <Card
                className=""
                title={s.label}
                button="Tìm hiểu thêm"
                image={s.image}
              >
                <p>{s.description}</p>
              </Card>
            </motion.div>
          ) : null
        )}
      </motion.div>
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
    <div className="wrapper max-lg:overflow-x-scroll w-full max-lg:-mt-8">
      <div className="lg:grid grid-cols-10 gap-x-5 lg:gap-x-2 flex flex-nowrap max-lg:p-8">
        {branches
          .find((b) => b.value === value)
          ?.addresses.map((a, i) => (
            <Card
              key={i}
              className="col-span-2"
              image={a.image}
              isHighlight={a.isHighlight}
            >
              <p
                className="text-base mt-4 font-bold"
                style={{ color: "var(--main-color)" }}
              >
                {a.address}
              </p>

              <p className="text-sm my-2">{a.district}</p>

              <a
                className="text-xs font-bold underline flex justify-center"
                href={a.map}
                style={{ color: "var(--main-color)" }}
                target="_blank"
              >
                <RiMapPin2Fill className="mr-1" size={12} />
                Nhấn xem chỉ đường
              </a>

              <RiButton className="w-full text-sm p-2 mt-4 uppercase" href="/">
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
    <div className="w-full max-lg:overflow-x-scroll">
      <div className="grid grid-cols-12 gap-5 max-lg:w-max max-lg:p-8">
        {members.map((m, i) =>
          m.value === value ? (
            <Card key={i} className="col-span-3 p-4" image={m.image}>
              <h3 className="mt-4 uppercase font-bold">{m.name}</h3>

              <h4 className="text-base font-bold color-main my-2">{m.title}</h4>

              <p className="rounded-xl p-2.5 mt-4 bg-sub1 text-black">
                Được đào tạo chuyên nghiệp trong lĩnh vực Chăm sóc da
              </p>
              <p className="rounded-xl p-2.5 mt-4 bg-sub1 text-black">
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
    <div className="w-full max-lg:overflow-x-scroll">
      <div className="flex flex-nowrap max-lg:w-max lg:grid grid-cols-12 gap-x-8 gap-y-10">
        {customers.map((customer, i) =>
          customer.value === value ? (
            <Card
              className="col-span-4 p-0 bg-main shadow-none"
              image={customer.image}
              key={i}
              title={`${customer.name} (${customer.age} tuổi)`}
            >
              <p className="text-black text-lg px-16">{customer.description}</p>
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
    <div className="grid grid-cols-12 gap-5 max-lg:px-4">
      <article className="col-span-12 lg:col-span-6 row-span-3 flex flex-col">
        <Link to="/">
          <Image
            className="rounded-xl"
            src={mainBlog.image}
            layout="fullWidth"
            alt={mainBlog.title}
          ></Image>

          <h3 className={"text-center"}>{mainBlog.title}</h3>

          <div className="divider"></div>

          <p
            className={"text-justify"}
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            {mainBlog.preview}
          </p>
        </Link>
      </article>

      {blogs.map((b, i) =>
        !b.isMain ? (
          <article key={i} className="col-span-12 lg:col-span-6 max-lg:mt-4">
            <Link
              className="block grid grid-cols-2 h-fit max-sm:flex flex-col"
              to="/"
            >
              <Image
                className="rounded-xl col-span-1"
                src={b.image}
                layout="fullWidth"
                alt={b.title}
              ></Image>

              <div className="col-span-1 ml-5 max-md:flex flex-col">
                <h3
                  className="m-0 text-lg max-md:mt-4"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {b.title}
                </h3>

                <div className="divider"></div>

                <p
                  className={"text-ellipsis"}
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    textOverflow: "ellipsis",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    wordWrap: "break-word",
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
