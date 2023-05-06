export default function ({$auth, redirect}) {
  if ($auth.user.role === null){
    return redirect('/login')
  }
}
