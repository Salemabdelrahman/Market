import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {
  // Signals
  username = signal('');
  password = signal('');
  error = signal('');
  isLoading = signal(false);

  // Shgvervices
  private auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    // تفعيل الأنيميشن عند التحميل
    this.animateOnLoad();
  }

  async onSubmit() {
    // تنظيف الحالة
    this.isLoading.set(true);
    this.error.set('');

    try {
      const user = await this.auth.login(
        this.username(),
        this.password()
      ).toPromise() as any;

      // التوجيه حسب الدور
      const route = user.role === 'admin' ? '/admin/cart' : '/products';
      await this.router.navigate([route]);

    } catch (err) {
      this.error.set('⚠️ اسم المستخدم أو كلمة المرور غير صحيحة');

      // إزالة الخطأ بعد 5 ثواني
      setTimeout(() => {
        this.error.set('');
      }, 5000);

    } finally {
      this.isLoading.set(false);
    }
  }

  private animateOnLoad() {
    // يمكنك إضافة أي logic إضافي هنا
  }
}
