import { html, TemplateResult } from 'lit';
import { BaseEditor } from './base-editor';
import { property } from 'lit/decorators.js';

class Form extends BaseEditor {
  @property() schema!: unknown;
  @property() data!: unknown;
  @property() changed!: (ev: CustomEvent) => void;
  protected render(): TemplateResult {
    this.config = this.store.config;
    this.hass = this.store.hass;

    return html`
      <ha-form
        .data=${this.data || this.config}
        .schema=${this.schema}
        .computeLabel=${computeLabel}
        .hass=${this.hass}
        @value-changed=${this.changed || this.valueChanged}
      ></ha-form>
    `;
  }
  protected valueChanged(ev: CustomEvent): void {
    const changed = ev.detail.value;
    this.config = {
      ...this.config,
      ...changed,
    };
    this.configChanged();
  }
}

export function computeLabel(schema: { name: string; help: string }) {
  let unCamelCased = schema.name.replace(/([A-Z])/g, ' $1');
  unCamelCased = unCamelCased.charAt(0).toUpperCase() + unCamelCased.slice(1);
  return unCamelCased + (schema.help ? ` (${schema.help})` : '');
}

customElements.define('sonos-card-editor-form', Form);
