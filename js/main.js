// Main Interactive Scripts for ARYUNG Plasma Sterilization System

document.addEventListener('DOMContentLoaded', () => {
  // 1. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');
      
      // Close all other items
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

  // 2. Consultation Form submission -> Convert to SMS or Direct Consultation
  const consultForm = document.getElementById('consultForm');
  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('userName').value.trim();
      const phone = document.getElementById('userPhone').value.trim();
      const category = document.getElementById('userCategory').value;
      const message = document.getElementById('userMessage').value.trim();

      if (!name || !phone) {
        alert('성함과 연락처를 입력해 주세요.');
        return;
      }

      // Pre-format SMS message
      const smsBody = encodeURIComponent(
        `[아륭기업 플라즈마 상담신청]\n성함: ${name}\n연락처: ${phone}\n분야: ${category}\n문의내용: ${message || '상세 상담 및 견적 요청'}`
      );

      const targetPhone = '01077242040';

      // Check device for SMS link format
      const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      const smsUrl = isiOS
        ? `sms:${targetPhone}&body=${smsBody}`
        : `sms:${targetPhone}?body=${smsBody}`;

      if (confirm('이종선 총괄본부장(010-7724-2040)에게 문자 문의를 전송하시겠습니까?')) {
        window.location.href = smsUrl;
      }
    });
  }

  // 3. Image Lightbox for High-Res brochure view
  const zoomableImages = document.querySelectorAll('.zoomable-img');
  if (zoomableImages.length > 0) {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'img-lightbox-modal';
    modal.innerHTML = `
      <div class="lightbox-overlay"></div>
      <div class="lightbox-container">
        <button class="lightbox-close" aria-label="닫기">&times;</button>
        <img class="lightbox-image" src="" alt="상세 확대 이미지" />
      </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('.lightbox-image');
    const closeBtn = modal.querySelector('.lightbox-close');
    const overlay = modal.querySelector('.lightbox-overlay');

    const closeModal = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    };

    zoomableImages.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        modalImg.src = img.src;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
  }
});
