import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
    @ViewChild('myChart', { static: true }) chartRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('myChart2', { static: true }) myChart2!: ElementRef<HTMLCanvasElement>;
  chart!: Chart; 
  chart2!:Chart;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
ngOnInit(){
  if (isPlatformBrowser(this.platformId)) {
  const ctx = this.chartRef.nativeElement.getContext('2d');
  const ctx2 = this.myChart2.nativeElement;

  const data = {
  // labels: labels,
    labels: [2024,2023,2022,2021,2019,2018,2017,2016,2015],  // <-- مهم
  datasets: [{
    // label: 'My First Dataset',
    data: [10000,30000 , 20000, 30000, 40000, 50000,2000,3000,4000],
    backgroundColor: [

      '#C9C9C9',

      '#FFA6F9',
    
      "#C9C9C9",
   
      "#B3A5F1",
      "#99DBFF",

,
      "#C9C9C9",
     
      "#C9C9C9",
      "#C9C9C9",
      "#C9C9C9"
    ],
    // borderColor: [
    //   'rgb(255, 99, 132)',
    //   'rgb(255, 159, 64)',
    //   'rgb(255, 205, 86)',
    //   'rgb(75, 192, 192)',
    //   'rgb(54, 162, 235)',
    //   'rgb(153, 102, 255)',
    //   'rgb(201, 203, 207)'
    // ],
    // borderWidth: 1
  }]
};
    if (!ctx) return;

    this.chart = new Chart(ctx, {
type: 'bar',

  data: data,
  options: {
       
     plugins: {
    title: {
      display: false   // دي بتخلي عنوان الرسم مش ظاهر خالص
    },
    legend: {
      display: false   // دي بتخلي مفتاح الألوان (Legend) مش ظاهر لو مش محتاجه
    }
  },
    scales: {
      y: {
      
      grid: {
        display: false  // ⛔ يشيل الخطوط الرأسية (الطولية)
      },
   
   
        beginAtZero: true,
          min: 0,           // أقل قيمة على المحور Y
         max: 60000,       // أعلى قيمة تريدها
      ticks: {
        display:true,
        stepSize: 10000  // مقدار زيادة كل خطوة على المحور
      }
      },
      x: {
      
      grid: {
        display: false  // ⛔ يشيل الخطوط الرأسية (الطولية)
      },
   
   
        beginAtZero: true,
          min: 0,           // أقل قيمة على المحور Y
         max: 60000,       // أعلى قيمة تريدها
      ticks: {
        display:true,
        stepSize: 10000  // مقدار زيادة كل خطوة على المحور
      }
      }
    }
  },
    });

    const data2= {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
      barThickness: 5, // 👈 عرض العمود
    maxBarThickness:5 ,// 👈 أقصى عرض مسموح بيه
    hoverOffset: 4,
    borderWidth:0
  }],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    weight:'2',
      scales: {
    x: {
      grid: {
        display: false  // ⛔ يشيل الخطوط الرأسية (الطولية)
      },
      ticks: {
        display: true   // ✅ لو عايز الأرقام تفضل موجودة
      }
    },
    y: {
      grid: {
        display: false  // ⛔ يشيل الخطوط الأفقية (العرضية)
      },
      ticks: {
        display: true
      }
    }
  },
    // cutoutPercentage: '5%', // 👈 العرض الداخلي للدائرة
    plugins: {
      legend: { display: false },
      title: { display: false }
    }
  }
};



 this.chart2 = new Chart(ctx2, {
type: 'doughnut',

  data: data2,
  options: {
     plugins: {
    title: {
      display: false   // دي بتخلي عنوان الرسم مش ظاهر خالص
    },
    legend: {
      display: false   // دي بتخلي مفتاح الألوان (Legend) مش ظاهر لو مش محتاجه
    }
  },
  },
    });




  }
  }
  

}
