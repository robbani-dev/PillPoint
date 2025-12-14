import { Link } from "react-router"
import logo from "../../assets/Logo.png"

const Logo = () => {
  return (
    <a href="/" className="flex items-center gap-1">
        <img src={logo} alt="logo" className="size-4 md:size-8 shadow-2xl" />
        <span className=" text-xl md:text-3xl md:font-bold">Pill<span className="text-secondary">Point</span></span>
    </a>
  )
}
export default Logo