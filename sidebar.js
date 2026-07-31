function renderSidebar(extraLinks) {
  var sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  var role = (localStorage.getItem('userRole') || '').toUpperCase();
  var isAdmin = ['OWNER', 'CO-FOUNDER', 'TEAM MANAGER', 'ADMIN', 'CADRE LEADER'].includes(role);

  function a(href, icon, label, cls, onclick) {
    var active = href === currentPage || (onclick && onclick.includes('gotoView') && href === currentPage);
    var style = 'display:flex; padding:10px 15px; text-decoration:none; color:var(--text-main); font-size:13px; font-weight:600; transition:0.2s; border-right:3px solid transparent;' + (active ? ' background:rgba(192,132,252,0.1); border-right-color:var(--electric-blue);' : '');
    if (cls) style += cls;
    var html = '<a href="' + href + '" style="' + style + '"';
    if (onclick) html += ' onclick="' + onclick + '"';
    if (cls && cls.indexOf('admin-only') !== -1 && !isAdmin) html += ' style="display:none;"';
    html += '><span style="margin-left:10px;">' + icon + '</span><span>' + label + '</span></a>';
    return html;
  }

  var sections = [
    {
      title: '📷 قسم الحضور',
      titleColor: '#00d2ff',
      links: [
        ['#', '📷', 'مسح الـ QR', '', "gotoView('index.html','scanner');return false;"],
        ['#', '✍️', 'التسجيل اليدوي السريع', '', "gotoView('index.html','manual');return false;"],
        ['batch-attendance.html', '📋', 'تسجيل غياب/حضور شامل', '', ''],
        ['#', '📊', 'لوحة الحضور', '', "gotoView('index.html','dashboard');return false;"],
        ['#', '📈', 'إحصائيات الجروبات', '', "gotoView('index.html','analytics');return false;"],
        ['#', '📧', 'الإعلانات والبريد', '', "gotoView('index.html','mail');return false;"]
      ]
    },
    {
      title: '🎯 قسم الدرجات والتقييم',
      titleColor: '#c084fc',
      links: [
        ['#', '📊', 'لوحة درجات الطلاب', '', "gotoView('grades.html','studentDashboard');return false;"],
        ['#', '🔍', 'استعلام عن طالب', '', "gotoView('grades.html','searchView');return false;"],
        ['#', '🏆', 'لوحة الشرف Top 5', '', "gotoView('grades.html','topView');return false;"],
        ['feedback.html', '💬', 'Feedback شامل', '', ''],
        ['TasksForAll.html', '📋', 'Tasks للكل', '', ''],
        ['Quizes.html', '📝', 'Quizes', '', ''],
        ['BonusForAll.html', '🎁', 'بونص للكل', '', ''],
        ['#', '⚙️', 'إعدادات النظام', '', "gotoView('grades.html','settings');return false;"]
      ]
    },
    {
      title: '⚙️ الإدارة العليا',
      titleColor: '#f5b041',
      adminOnly: true,
      links: [
        ['#', '👥', 'إدارة المستخدمين', '', "gotoView('index.html','users');return false;"]
      ]
    }
  ];

  if (extraLinks) {
    for (var s = 0; s < extraLinks.length; s++) {
      var ext = extraLinks[s];
      var found = false;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].title === ext.title) { found = true; sections[i].links = sections[i].links.concat(ext.links); break; }
      }
      if (!found) sections.push(ext);
    }
  }

  var html = '<button class="close-btn" onclick="toggleSidebar()">×</button>';
  html += '<div style="padding:20px; text-align:center; border-bottom:1px solid rgba(255,255,255,0.05); margin-bottom:10px;"><div style="font-weight:900; color:var(--electric-blue); font-size:1.3rem;">Eduneers System</div><div id="sideRole" style="font-size:10px; opacity:0.7; margin-top:5px; text-transform:uppercase; background:rgba(255,255,255,0.1); display:inline-block; padding:4px 10px; border-radius:8px;"></div></div>';

  for (var secIdx = 0; secIdx < sections.length; secIdx++) {
    var sec = sections[secIdx];
    if (sec.adminOnly && !isAdmin) continue;
    html += '<div style="margin:15px; border-radius:12px; border:1px solid ' + sec.titleColor + '30; box-shadow:0 0 15px ' + sec.titleColor + '0d; overflow:hidden;"><div style="background:' + sec.titleColor + '1a; padding:8px 15px; font-weight:900; color:' + sec.titleColor + '; font-size:12px; letter-spacing:1px; border-bottom:1px solid ' + sec.titleColor + '1a;">' + sec.title + '</div><div style="padding:5px 0;">';
    for (var li = 0; li < sec.links.length; li++) {
      var l = sec.links[li];
      html += a(l[0], l[1], l[2], l[3], l[4]);
    }
    html += '</div></div>';
  }

  html += '<a href="#" onclick="logout();return false;" style="color:#ef4444; margin:15px; background:rgba(239,68,68,0.1); border-radius:12px; text-align:center; justify-content:center; display:flex; padding:10px 15px; text-decoration:none; font-weight:600; font-size:13px;"><span style="margin-left:10px;">🚪</span><span>تسجيل الخروج</span></a>';
  html += '<div style="height:100px; flex-shrink:0;"></div>';

  sidebar.innerHTML = html;

  setTimeout(function () {
    var roleRaw = localStorage.getItem('userRole') || '';
    var el = document.getElementById('sideRole');
    if (el) {
      var r = roleRaw.toUpperCase();
      el.innerText = r === 'OWNER' ? 'المالك 👑' : r === 'CO-FOUNDER' ? 'CO-Founder 🌟' : r === 'TEAM MANAGER' || r === 'ADMIN' ? 'Team Manager' : r === 'CADRE LEADER' ? 'Cadre Leader 🌟' : r === 'QUALITY CONTROL' ? 'Quality Control 👁️' : r === 'COORDINATOR' || r === 'MANAGER' ? 'Coordinator' : 'Cadre';
    }
  }, 0);
}
