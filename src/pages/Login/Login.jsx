import AuthForm from "./AuthForm";
import AnimatedBackground from "./AnimatedBackground";
import Hero from "./Hero";

function Login() {
  return (
    <div className="h-screen overflow-hidden lg:grid lg:grid-cols-2">
      
      {/* =========================================
          LEFT SIDE
      ========================================= */}

      <section className="relative hidden h-screen overflow-hidden bg-indigo-600 lg:block">
        <div className="relative h-full overflow-hidden bg-[#4c3df5]">
          <AnimatedBackground />
          <Hero />
        </div>
      </section>

      {/* =========================================
          RIGHT SIDE
      ========================================= */}

      <section className="flex h-screen items-center justify-center overflow-hidden bg-white px-6 py-12">
        <AuthForm />
      </section>

    </div>
  );
}

export default Login;