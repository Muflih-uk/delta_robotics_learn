import Link from "next/link";

export default function StudentDashboardPage() {
  return (
    <main className="flex-1 p-4 md:p-10 bg-background min-h-screen max-w-[1440px] mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Welcome back, Alex.</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Your robotics learning journey is looking solid today.</p>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="relative">
            <span className="material-symbols-outlined text-secondary cursor-pointer hover:text-primary-container">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary-container rounded-full"></span>
          </div>
          <img
            alt="User profile"
            className="w-10 h-10 rounded-full object-cover shadow-sm"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB--e6dnBZNASTTRm6e2EaShxdV78ORhMx3REiS13VoKx7ymregT6J4hLZ6TV3zMgP7D3tcK2uiDlwNzSqDWSsmPif0vyJsNqHX-RokSvba5IlysPlJmtm-GGiNV4DWSoUAYnq_u9zRDp5_-ExlxeGVrGiFk8ctr6eBq6jWguwHJZ_gF4rrhpOP44CQhyp1f-Pbg4IZpz0gF-bQeT0DSalgOCxiY-J70kD2Ga_fHna74MiL3ybiYrQE1A"
          />
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        {/* Learning Stats (Span 8) */}
        <div className="md:col-span-8 bg-surface-container-lowest border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Learning Activity</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Hours</div>
              <div className="font-headline-lg text-headline-lg text-primary-container mt-1">142</div>
            </div>
            <div>
              <div className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Projects</div>
              <div className="font-headline-lg text-headline-lg text-on-surface mt-1">12</div>
            </div>
            <div>
              <div className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Certificates</div>
              <div className="font-headline-lg text-headline-lg text-on-surface mt-1">3</div>
            </div>
            <div>
              <div className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Streak</div>
              <div className="font-headline-lg text-headline-lg text-primary-container mt-1 flex items-baseline gap-1">
                5 <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              </div>
            </div>
          </div>
          <div className="mt-12 w-full h-32 bg-surface-container rounded-lg relative overflow-hidden flex items-end px-4 gap-2">
            <div className="flex-1 bg-primary-container rounded-t-sm h-1/4 opacity-40"></div>
            <div className="flex-1 bg-primary-container rounded-t-sm h-2/4 opacity-60"></div>
            <div className="flex-1 bg-primary-container rounded-t-sm h-1/3 opacity-40"></div>
            <div className="flex-1 bg-primary-container rounded-t-sm h-3/4 opacity-80"></div>
            <div className="flex-1 bg-primary-container rounded-t-sm h-full"></div>
            <div className="flex-1 bg-primary-container rounded-t-sm h-2/3 opacity-60"></div>
            <div className="flex-1 bg-primary-container rounded-t-sm h-1/2 opacity-40"></div>
          </div>
        </div>

        {/* Upcoming (Span 4) */}
        <div className="md:col-span-4 bg-surface-bright border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-on-surface">Upcoming</h2>
            <span className="material-symbols-outlined text-secondary">calendar_today</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="p-3 bg-surface-container-low rounded-lg border-l-4 border-primary-container">
              <div className="font-label-sm text-label-sm text-primary-container mb-1">Today, 2:00 PM</div>
              <div className="font-body-md text-body-md font-semibold text-on-surface">Advanced Kinematics Lab</div>
              <div className="font-label-sm text-label-sm text-secondary mt-1">Live Session &bull; Room 4B</div>
            </div>
            <div className="p-3 bg-surface-container-lowest rounded-lg border border-surface-variant">
              <div className="font-label-sm text-label-sm text-secondary mb-1">Tomorrow, 10:00 AM</div>
              <div className="font-body-md text-body-md font-semibold text-on-surface">Project Submission</div>
              <div className="font-label-sm text-label-sm text-secondary mt-1">Autonomous Navigation</div>
            </div>
          </div>
        </div>
      </div>

      {/* My Courses */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">My Courses</h2>
          <Link className="font-label-sm text-label-sm text-primary-container hover:underline flex items-center gap-1" href="/student/courses">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Course Card 1 */}
          <div className="bg-surface-container-lowest border border-border rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col">
            <div
              className="bg-cover bg-center w-full h-40"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDzNA9wx-SR0bqA0pNKUNtz6mvtOuUhSBOlwAMWlHe7cMTmkte5-Une9wUepzHp_rTWSIGkBc_w2vee1LvXasW3w2F-n_JxvDeXGI0okjNUHROCY7oaRfglA7QW1uZj8ZzMz_RBm4VEUAr5gD8BMYhmuT28xZBbiSDMTP8BG6Uw1Ez3BsJsfx6ZNIf9PF65Z5kPijKz0KfEeCuT8bq_ibmw5tzhVW9buYIZuV-YT8XNZ_AIIGlzwXte8g')",
              }}
            ></div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex gap-2 mb-3">
                <span className="bg-primary-fixed px-2 py-1 rounded-sm font-label-sm text-[10px] text-on-primary-fixed uppercase font-bold">In Progress</span>
                <span className="bg-surface-variant px-2 py-1 rounded-sm font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">Hardware</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Intro to ROS 2</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-1 text-sm">Master the fundamentals of the Robot Operating System to build robust applications.</p>
              <div className="mt-auto">
                <div className="flex justify-between font-label-sm text-label-sm text-sm mb-1 text-on-surface-variant">
                  <span>65% Complete</span>
                  <span>Mod 3/5</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Card 2 */}
          <div className="bg-surface-container-lowest border border-border rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col">
            <div
              className="bg-cover bg-center w-full h-40"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCHUwCJgyFV3EO_osRDHCBtmDC31vl0d2nLbfqHzMZ4nPdGh-G0ACyhMQmSPjUu7jNC6au5yXnfLcISeSPNaXB9uWAwOYgMqi74-hOxUKrZVLhO0rUrSH5ZBPHyrqsHDe2wnxXOmLKpAA_3tZOUYk3Rk7ZNbvzi4ASOnoEiAaSaRkrP8V7D7vVKb1p8WcpHhjmywF3tuGeEfrYITdv__o_zvKxnAITSbkpD9kZMK71FT9ayv54esgUaWw')",
              }}
            ></div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex gap-2 mb-3">
                <span className="bg-primary-fixed px-2 py-1 rounded-sm font-label-sm text-[10px] text-on-primary-fixed uppercase font-bold">In Progress</span>
                <span className="bg-surface-variant px-2 py-1 rounded-sm font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">Software</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Computer Vision Basics</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-1 text-sm">Implement object detection and spatial reasoning for autonomous platforms.</p>
              <div className="mt-auto">
                <div className="flex justify-between font-label-sm text-label-sm text-sm mb-1 text-on-surface-variant">
                  <span>30% Complete</span>
                  <span>Mod 1/4</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Explore Card */}
          <div className="bg-surface-container-lowest border-2 border-dashed border-surface-variant rounded-xl p-6 flex flex-col justify-center items-center text-center hover:bg-surface-container-low transition-colors cursor-pointer min-h-[300px]">
            <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary-container text-3xl">explore</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Enroll in New Courses</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 text-sm max-w-[200px]">Expand your skills with advanced robotics and AI programs.</p>
            <button className="bg-primary-container text-on-primary font-bold rounded-lg px-6 py-2 hover:bg-primary transition-colors font-label-sm">
              Browse Catalog
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
