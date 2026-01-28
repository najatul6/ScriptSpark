import { Button } from "@/components/ui/button"

export default function GoogleButton({ onClick }) {
  return (
    <Button
      variant="outline"
      className="w-full flex items-center gap-2"
      onClick={onClick}
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="h-5 w-5"
      />
      Continue with Google
    </Button>
  )
}
