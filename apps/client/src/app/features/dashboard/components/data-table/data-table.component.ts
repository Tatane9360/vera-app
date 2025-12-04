import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableItem {
  id: string;
  name: string;
  url: string;
  logo: string; // URL or icon name
  status: 'Customer' | 'Churned';
  users: string[]; // Array of avatar URLs
  userCount: number;
  aboutTitle: string;
  aboutDesc: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr
              class="border-b border-gray-100 text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              <th class="p-4 w-10">
                <input
                  type="checkbox"
                  class="rounded border-gray-300 text-vera-green focus:ring-vera-green"
                />
              </th>
              <th class="p-4">Company</th>
              <th class="p-4">Status</th>
              <th class="p-4">Users</th>
              <th class="p-4">About</th>
              <th class="p-4 w-20"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr
              *ngFor="let item of data"
              class="hover:bg-gray-50 transition-colors group"
            >
              <td class="p-4">
                <input
                  type="checkbox"
                  class="rounded border-gray-300 text-vera-green focus:ring-vera-green"
                />
              </td>
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl"
                  >
                    <img
                      *ngIf="item.logo.startsWith('http')"
                      [src]="item.logo"
                      class="w-full h-full rounded-full object-cover"
                      alt="Logo"
                    />
                    <span
                      *ngIf="!item.logo.startsWith('http')"
                      class="material-icons-outlined text-gray-500"
                      >{{ item.logo }}</span
                    >
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">{{ item.name }}</div>
                    <div class="text-sm text-gray-500">{{ item.url }}</div>
                  </div>
                </div>
              </td>
              <td class="p-4">
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  [ngClass]="{
                    'bg-green-100 text-green-700': item.status === 'Customer',
                    'bg-gray-100 text-gray-600': item.status === 'Churned'
                  }"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="p-4">
                <div class="flex -space-x-2">
                  <img
                    *ngFor="let user of item.users"
                    [src]="user"
                    class="w-8 h-8 rounded-full border-2 border-white"
                    alt="User"
                  />
                  <div
                    class="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500"
                  >
                    +{{ item.userCount }}
                  </div>
                </div>
              </td>
              <td class="p-4">
                <div>
                  <div class="font-medium text-gray-900">
                    {{ item.aboutTitle }}
                  </div>
                  <div class="text-sm text-gray-500">{{ item.aboutDesc }}</div>
                </div>
              </td>
              <td class="p-4">
                <div
                  class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    class="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <span class="material-icons-outlined text-lg">delete</span>
                  </button>
                  <button
                    class="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <span class="material-icons-outlined text-lg">edit</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination (Mock) -->
      <div
        class="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500"
      >
        <div class="flex gap-2">
          <button
            class="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            class="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div>Page 1 of 10</div>
      </div>
    </div>
  `,
})
export class DataTableComponent {
  @Input() data: TableItem[] = [];
}
