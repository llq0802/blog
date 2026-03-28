import Image from 'next/image';
import { Mail, MapPin, Briefcase, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className='min-h-screen py-12'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='max-w-3xl mx-auto text-center mb-16'>
          <h1 className='text-4xl font-bold text-slate-900 dark:text-white mb-4'>关于我</h1>
          <p className='text-lg text-slate-600 dark:text-slate-400'>热爱技术，热爱生活</p>
        </div>

        {/* Profile Card */}
        <div className='max-w-4xl mx-auto'>
          <div className='bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden'>
            <div className='h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' />
            <div className='px-8 pb-8'>
              <div className='relative -mt-16 mb-6'>
                <div className='w-32 h-32 rounded-2xl bg-white dark:bg-slate-800 p-1 shadow-lg'>
                  <div className='w-full h-full rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 flex items-center justify-center text-5xl'>
                    👨‍💻
                  </div>
                </div>
              </div>

              <div className='mb-8'>
                <h2 className='text-2xl font-bold text-slate-900 dark:text-white mb-2'>博客作者</h2>
                <p className='text-slate-600 dark:text-slate-400 flex items-center gap-2'>
                  <MapPin className='w-4 h-4' />
                  中国
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
                <div>
                  <h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2'>
                    <Briefcase className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
                    关于博客
                  </h3>
                  <p className='text-slate-600 dark:text-slate-400 leading-relaxed'>
                    这是一个基于 Next.js 构建的现代化博客系统。在这里，我分享前端开发技术、
                    编程心得、生活感悟以及各种有趣的技术探索。希望我的文章能给你带来启发和帮助。
                  </p>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2'>
                    <Heart className='w-5 h-5 text-pink-600 dark:text-pink-400' />
                    兴趣爱好
                  </h3>
                  <ul className='space-y-2 text-slate-600 dark:text-slate-400'>
                    <li className='flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-indigo-500 rounded-full' />
                      前端开发与用户体验设计
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-indigo-500 rounded-full' />
                      开源项目贡献
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-indigo-500 rounded-full' />
                      阅读与技术写作
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-indigo-500 rounded-full' />
                      探索新技术与工具
                    </li>
                  </ul>
                </div>
              </div>

              <div className='border-t border-slate-200 dark:border-slate-800 pt-8'>
                <h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-4'>联系方式</h3>
                <div className='flex flex-wrap gap-4'>
                  <a
                    href='https://github.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors'
                  >
                    <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href='https://twitter.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors'
                  >
                    <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                    </svg>
                    Twitter
                  </a>
                  <a
                    href='mailto:hello@example.com'
                    className='inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors'
                  >
                    <Mail className='w-5 h-5' />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className='mt-12'>
            <h3 className='text-xl font-bold text-slate-900 dark:text-white mb-6 text-center'>技术栈</h3>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                { name: 'Next.js', icon: '▲', color: 'from-slate-700 to-slate-900' },
                { name: 'React', icon: '⚛️', color: 'from-cyan-500 to-blue-500' },
                { name: 'TypeScript', icon: '📘', color: 'from-blue-500 to-blue-700' },
                { name: 'Tailwind CSS', icon: '🎨', color: 'from-cyan-400 to-teal-500' },
                { name: 'Prisma', icon: '🌿', color: 'from-emerald-500 to-green-600' },
                { name: 'SQLite', icon: '🗄️', color: 'from-blue-400 to-indigo-500' },
                { name: 'Vercel', icon: '▲', color: 'from-slate-800 to-black' },
                { name: 'GitHub Actions', icon: '🔄', color: 'from-gray-600 to-gray-800' },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className='flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors'
                >
                  <span className='text-2xl'>{tech.icon}</span>
                  <span className='font-medium text-slate-900 dark:text-white'>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
