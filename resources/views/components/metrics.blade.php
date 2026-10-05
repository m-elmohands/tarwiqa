<article class="overview-metric">
    <span class="metric-icon {{ $type }}" aria-hidden="true">{{ strtoupper(str($type)->substr(0, 1)) }}</span>
    <div>
        <small>{{ str(str_replace('_', ' ', $title))->title() }}</small>
        <strong>{{ $value }}</strong>
    </div>
</article>