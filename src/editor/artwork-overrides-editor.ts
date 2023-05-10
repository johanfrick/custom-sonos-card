import { html, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { mdiPen, mdiPlus } from '@mdi/js';
import { BaseEditor } from './base-editor';

class ArtworkOverridesEditor extends BaseEditor {
  @state() editItem!: number;

  protected render(): TemplateResult {
    ({ config: this.config, hass: this.hass } = this.store);
    const items = this.config.mediaArtworkOverrides;

    return this.editItem > -1
      ? html`<dev-sonos-card-artwork-override-editor
          .index=${this.editItem}
          .store=${this.store}
          @closed=${() => (this.editItem = -1)}
        ></dev-sonos-card-artwork-override-editor>`
      : html`
          <div>
            Artwork Overrides
            <ha-control-button-group>
              ${items?.map((pg, index) => {
                const itemName =
                  pg.mediaTitleEquals || pg.mediaContentIdEquals || (pg.ifMissing && 'if missing') || index;
                return html`
                  <ha-control-button @click="${() => (this.editItem = index)}">
                    ${itemName}<ha-svg-icon .path=${mdiPen} label="Edit"></ha-svg-icon>
                  </ha-control-button>
                `;
              })}
              <ha-control-button @click="${() => (this.editItem = items ? items.length : 0)}">
                Add<ha-svg-icon .path=${mdiPlus} label="Add"></ha-svg-icon>
              </ha-control-button>
            </ha-control-button-group>
          </div>
        `;
  }
}

customElements.define('dev-sonos-card-artwork-overrides-editor', ArtworkOverridesEditor);
