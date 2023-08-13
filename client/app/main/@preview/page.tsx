export default function Preview({ isLeftVisible }: { isLeftVisible: boolean }) {
  return isLeftVisible && <div className="flex w-1/2 p-2">it works</div>
}
