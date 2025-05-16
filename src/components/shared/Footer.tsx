import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-yellow-400 py-10 px-6 md:px-16 text-sm text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="https://traveltoyourteacher.ru/wp-content/uploads/2024/11/cropped-cropped-Logo-for-Travel-to-Your-Teacher-travel-agency_Var-1.1.png"
            alt="Logo"
            width={100}
            height={100}
            className="rounded-full border-2 border-white"
          />
        </div>

        {/* Учителя */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Учителя</h4>
          <ul className="space-y-2 text-[#5E6282]">
            <li>
              <Link href="#">Страны</Link>
            </li>
            <li>
              <Link href="#">Категории</Link>
            </li>
            <li>
              <Link href="#">Записаться</Link>
            </li>
          </ul>
        </div>

        {/* Оплата */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Оплата</h4>
          <ul className="space-y-2 text-[#5E6282]">
            <li>
              <Link href="#">Помощь</Link>
            </li>
            <li>
              <Link href="#">Политика</Link>
            </li>
            <li>
              <Link href="#">Оферта</Link>
            </li>
          </ul>
        </div>

        {/* Другое */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Другое</h4>
          <ul className="space-y-2 text-[#5E6282] ">
            <li>
              <Link href="#">Личный кабинет</Link>
            </li>
            <li>
              <Link href="#">Блог</Link>
            </li>
            <li>
              <Link href="#">Связаться</Link>
            </li>
          </ul>
        </div>

        {/* Social & App Download */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex space-x-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="icon"
                className="bg-[#1877F2] text-white hover:bg-[#155dc1] rounded-full"
              >
                <FaFacebookF />
              </Button>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="icon"
                className="bg-[#E4405F] text-white hover:bg-[#c32c4f] rounded-full"
              >
                <FaInstagram />
              </Button>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="icon"
                className="bg-[#1DA1F2] text-white hover:bg-[#0d8ddb] rounded-full"
              >
                <FaTwitter />
              </Button>
            </a>
          </div>

          <p className="mt-2">Скачайте приложение</p>
          <div className="flex space-x-2">
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/footer-image/Google Play.png"
                alt="Google Play"
                width={100}
                height={32}
              />
            </a>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/footer-image/Play Store.png"
                alt="App Store"
                width={100}
                height={32}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-6 flex flex-col sm:flex-row justify-center items-center text-center text-md gap-4 text-black">
        Поддержка защищённых онлайн-платежей
        <div className="flex gap-4">
          <Image
            src="/assets/footer-image/Paypal-Logo-2014 2.png"
            alt="PayPal"
            width={50}
            height={20}
            className="object-contain"
          />
          <Image
            src="/assets/footer-image/stripe.png"
            alt="Stripe"
            width={50}
            height={20}
            className="object-contain"
          />
        </div>
      </div>
    </footer>
  );
}
