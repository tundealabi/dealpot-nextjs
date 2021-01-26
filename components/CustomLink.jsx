import { useRouter } from 'next/router';

const CustomLink = ({children, href, classs}) => {
    const router = useRouter()
    const handleClick = (e) => {
        e.preventDefault()
        router.push(href)
      }
      return (
        <a href={href} onClickCapture={handleClick} className={classs}>
          {children}
        </a>
      )
}

export default CustomLink;